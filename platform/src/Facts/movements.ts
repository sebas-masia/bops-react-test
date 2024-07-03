import { isInRange } from '@Models';

const processGroupMovements = (movements: any, range: any, measureType: any) => {
  const processGroup = {};
  Object.values(movements).forEach((movement: any) => {
    const timestamp = new Date(movement.timestamp);
    if (isInRange(range, timestamp)) {
      if (!(movement.process_group in processGroup)) {
        processGroup[movement.process_group] = 0;
      }
      if (measureType === 'quantity' && typeof movement.quantity !== 'undefined') {
        processGroup[movement.process_group] += movement.quantity;
      } else if (measureType === 'currency' && typeof movement.currency_value !== 'undefined') {
        processGroup[movement.process_group] += movement.currency_value;
      } else {
        processGroup[movement.process_group] += 1;
      }
    }
  });

  return processGroup;
};

const processLeadTimes = (movements, range) => {
  const leadTimesHelper = {};
  Object.values(movements).forEach((movement: any) => {
    const timestamp = new Date(movement.timestamp);
    if (isInRange(range, timestamp)) {
      if ('purchase_order_number' in movement) {
        const purchaseOrderNumber = movement.purchase_order_number;
        if (!(purchaseOrderNumber in leadTimesHelper)) {
          leadTimesHelper[purchaseOrderNumber] = {};
        }

        if (movement.movement_type.includes('shipment') && 'source_location_id' in movement) {
          leadTimesHelper[purchaseOrderNumber].source = movement;
        } else if (movement.movement_type.includes('receipt') && 'destination_location_id' in movement) {
          leadTimesHelper[purchaseOrderNumber].destination = movement;
        }
      }
    }
  });

  const leadTimes: any[] = [];
  Object.entries(leadTimesHelper).forEach(([id, movement_]) => {
    const movement: any = movement_;
    if ('source' in movement && 'destination' in movement) {
      const start = new Date(movement.source.timestamp);
      const end = new Date(movement.destination.timestamp);
      const duration = Math.abs(end.valueOf() - start.valueOf()) / (1000 * 60 * 60 * 24);
      const leadTime = {
        source: movement.source.source_location_id,
        destination: movement.destination.destination_location_id,
        start,
        end,
        duration,
      };
      leadTimes.push({
        id,
        leadTime,
      });
    }
  });

  const leads = leadTimes.sort((a, b) => {
    return b.leadTime.end - a.leadTime.end;
  });

  return leads;
};

const processContextLeadTimes = (entityLeadTimes, range) => {
  const leadTimes: any[] = [];
  Object.entries(entityLeadTimes).forEach(([id, leadTime_]) => {
    const leadTime: any = leadTime_;
    const start = new Date(leadTime.start);
    const end = new Date(leadTime.end);
    if ((start >= range.start && start < range.end) || (end >= range.end && start < range.end)) {
      leadTimes.push({
        id,
        leadTime: {
          source: leadTime.source,
          destination: leadTime.destination,
          start,
          end,
          duration: leadTime.duration,
        },
      });
    }
  });

  const leads = leadTimes.sort((a, b) => {
    return b.leadTime.end - a.leadTime.end;
  });
  return leads;
};

export { processGroupMovements, processLeadTimes, processContextLeadTimes };
