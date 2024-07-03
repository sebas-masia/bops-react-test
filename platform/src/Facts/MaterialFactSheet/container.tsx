import { TimeSeries } from '@Models';
import { processContextLeadTimes } from '../movements';
import MaterialFactSheet from './component';

const MaterialFactSheetContainer = ({ material, locationMaterials, range }) => {
  const getType = () => {
    if (!('type' in material)) return null;

    return material.type.charAt(0).toUpperCase() + material.type.slice(1);
  };

  const computeComponentList = (component) => {
    if (!(component in material)) return null;

    return [...material[component]].sort().map((internalComponent) => {
      // todo avoid clone
      return (
        <li key={internalComponent} className="component-list">
          {internalComponent}
        </li>
      );
    });
  };

  const computeInventoryLocation = () => {
    const inventoryLocation: {
      location: string;
      inventory: number;
    }[] = [];

    Object.values(locationMaterials).forEach((locationMaterial: any) => {
      if (!('inventoryonhand' in locationMaterial.kpis)) {
        return;
      }

      const inventoryTimeValue: TimeSeries[] = locationMaterial.kpis.inventoryonhand.timeValues;
      const inventories = Object.values(inventoryTimeValue).sort((a, b) => {
        const ats = new Date(a.timestamp);
        const bts = new Date(b.timestamp);
        return bts.valueOf() - ats.valueOf();
      });

      inventoryLocation.push({
        location: locationMaterial.locationId,
        inventory: Number(inventories[0].value),
      });
    });

    return inventoryLocation;
  };

  const computeLeadTimes = () => {
    if (!('leadTimes' in material)) {
      return [];
    }
    return processContextLeadTimes(material.leadTimes, range) as {
      id: string;
      leadTime: any;
    }[];
  };

  const type = getType();
  const componentList = computeComponentList('components');
  const headerList = computeComponentList('headers');
  const inventoryLocation = computeInventoryLocation();
  const leadTimes = computeLeadTimes();

  const { id, name, uom, unitCost, unitSalesPrice, kpis } = material;

  const details = [
    { title: 'Name', text: name },
    { title: 'Type', text: type },
    { title: 'Unit of Measurement', text: uom },
    { title: 'Unit Cost', text: unitCost },
    { title: 'Unit Sales Price', text: unitSalesPrice },
  ];

  return (
    <MaterialFactSheet
      id={id}
      details={details}
      kpis={kpis}
      componentList={componentList}
      headerList={headerList}
      inventoryLocation={inventoryLocation}
      leadTimes={leadTimes}
    />
  );
};

export default MaterialFactSheetContainer;
