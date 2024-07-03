import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useGetLocationsQuery, useGetMaterialsQuery, useGetLocationMaterialsQuery, fetchNetwork } from '@Store';
import { TimeSeries } from '@Models';
import { ProcessGroup } from '@Components';
import NetworkViewController from './component';
import { computeChart } from '../../networkModel';

const NetworkViewControllerContainer = ({ rawLocations, rawMaterials, rawLocationMaterials }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSelected = (selected) => {
    if (Object.keys(selected.materials).length === 0) {
      navigate('/');
      return;
    }
    setSearchParams({ m: Object.keys(selected.materials)[0] });
  };

  const materialSelected = searchParams.get('m');

  const initResult = fetchNetwork(rawMaterials, rawLocations, rawLocationMaterials, materialSelected);
  const { movements: initMovements, locations: initLocations } = computeChart(
    rawLocations,
    rawMaterials,
    initResult.selected,
  );

  const [selected, setSelected] = useState(initResult.selected);

  const generateLocationMaterialPairs = (locationIds: string[], materialIds: string[]) => {
    const locationMaterialIds: any[] = [];
    Object.values(locationIds).forEach((locationId: string) => {
      Object.values(materialIds).forEach((materialId: string) => {
        const locationMaterialId = {
          locationId,
          materialId,
        };
        locationMaterialIds.push(locationMaterialId);
      });
    });

    return locationMaterialIds;
  };

  const calculateInventory = (locationMaterialsData: any[], locationMaterialIds: any[], range: any) => {
    let inventory = 0;
    Object.values(locationMaterialIds).forEach((locationMaterialId) => {
      Object.values(locationMaterialsData).forEach((locationMaterialData: any) => {
        if (!('inventoryonhand' in locationMaterialData.kpis)) {
          return;
        }

        if (
          locationMaterialId.locationId !== locationMaterialData.locationId ||
          locationMaterialId.materialId !== locationMaterialData.materialId
        ) {
          return;
        }

        const inventoryTimeValue: TimeSeries[] = locationMaterialData.kpis.inventoryonhand.timeValues;
        const inventories = Object.values(inventoryTimeValue).sort((a, b) => {
          // todo remove clone
          const ats = new Date(a.timestamp);
          const bts = new Date(b.timestamp);
          return bts.valueOf() - ats.valueOf();
        });

        if (typeof range === 'undefined' || Object.keys(range).length === 0 || typeof range.end === 'undefined') {
          inventory = Number(inventories[0].value);
          return;
        }

        inventories.forEach((timeValue) => {
          const ts = new Date(timeValue.timestamp);
          if (ts <= range.end && inventory === 0) {
            inventory = Number(timeValue.value);
          }
        });
      });
    });
    return inventory;
  };

  const computeNodes = (locations, range) => {
    const nodes: any[] = [];
    Object.keys(locations).forEach((key) => {
      const location = locations[key];
      const locationType = location.id.endsWith('-transit') ? 'transit' : location.network_type;
      const locationMaterialIds = generateLocationMaterialPairs([location.id], Object.keys(selected.materials));
      const inventory = calculateInventory(rawLocationMaterials, locationMaterialIds, range);
      nodes.push({
        id: location.id,
        title: location.id,
        type: locationType,
        name: location.name,
        inventory,
        coordinates: {
          lat: location.latitude,
          lng: location.longitude,
        },
      });
    });

    return nodes;
  };

  const createEdge = (movement) => {
    const source = movement.source_location_id;
    let destination = movement.destination_location_id;
    if (typeof destination === 'undefined' && movement.movement_type !== 'customer-shipment') {
      destination = source;
    }

    return {
      id: movement.id,
      source,
      destination,
      type: movement.movement_type,
      processGroup: movement.process_group,
      currency: movement.currency,
      currencyValue: movement.currency_value,
      quantity: movement.quantity,
      timestamp: Date.parse(movement.timestamp),
    };
  };

  const computeEdges = (movements) => {
    const edges: any[] = [];
    Object.keys(movements).forEach((key) => {
      const edge = createEdge(movements[key]);
      edges.push(edge);
    });

    return edges;
  };

  const [network, setNetwork] = useState({
    nodes: computeNodes(initLocations, {}),
    edges: computeEdges(initMovements),
  });

  const [networkConfig, setNetworkConfig] = useState({
    range: {},
    map: false,
  });

  const fetchSearchedValue = (value) => {
    const result = fetchNetwork(rawMaterials, rawLocations, rawLocationMaterials, value);
    const { movements, locations } = computeChart(rawLocations, rawMaterials, result.selected);

    setSelected(result.selected);

    setNetwork({
      nodes: computeNodes(locations, networkConfig.range),
      edges: computeEdges(movements),
    });

    return result;
  };

  useEffect(() => {
    fetchSearchedValue(materialSelected);
  }, [materialSelected]);

  const [edgeConfig, setEdgeConfig] = useState({
    aggregateType: 'process_group',
    measureType: 'quantity',
    detailed: false,
  });

  const getProcessGroupsQuantity = (range): ProcessGroup[] => {
    const processGroupTypes = new Set();
    network.edges.forEach((e) => processGroupTypes.add(e.processGroup));

    const processGroups: ProcessGroup[] = Array.from(processGroupTypes).map((processGroupType) => ({
      processGroup: (processGroupType as any).toString(),
      value: network.edges
        .filter((e) => e.processGroup === processGroupType)
        .filter((e) => {
          const rangeIsValid = range && range.start && range.end;
          if (!rangeIsValid) return true;

          const ts = new Date(e.timestamp);
          const dateIsInRange = rangeIsValid && ts <= range.end && ts >= range.start;
          return dateIsInRange;
        })
        .reduce((previous, current) => previous + current.quantity, 0),
    }));

    return processGroups.filter((p) => p.value > 0);
  };

  const [processGroups, setProcessGroups] = useState(getProcessGroupsQuantity({}));

  const onChartClick = () => {};

  const onMeasureTypeChange = (selectedMeasure) => {
    setEdgeConfig({
      ...edgeConfig,
      measureType: selectedMeasure.value,
    });
  };

  const onAggregateTypeChange = (selectedAggregate) => {
    setEdgeConfig({
      ...edgeConfig,
      aggregateType: selectedAggregate.value,
    });
  };

  const onSearchResult = (value) => {
    const result = fetchSearchedValue(value);
    onSelected(result.selected);
  };

  const onMapChange = (active) => {
    setNetworkConfig({
      ...networkConfig,
      map: active,
    });
  };

  const onDetailedChange = (active) => {
    const { measureType, aggregateType } = edgeConfig;

    setEdgeConfig({
      measureType,
      aggregateType,
      detailed: active,
    });
  };

  const onRangeChange = (range) => {
    const { movements, locations } = computeChart(rawLocations, rawMaterials, selected);

    setNetworkConfig({
      ...networkConfig,
      range,
    });

    setNetwork({
      ...network,
      nodes: computeNodes(locations, range),
      edges: computeEdges(movements),
    });

    setProcessGroups(getProcessGroupsQuantity(range));
  };

  return (
    <NetworkViewController
      materialSelected={materialSelected}
      onMapChange={onMapChange}
      onSearchResult={onSearchResult}
      onDetailedChange={onDetailedChange}
      onAggregateTypeChange={onAggregateTypeChange}
      onMeasureTypeChange={onMeasureTypeChange}
      selected={selected}
      networkConfig={networkConfig}
      network={network}
      processGroups={processGroups}
      edgeConfig={edgeConfig}
      onRangeChange={onRangeChange}
      onChartClick={onChartClick}
    />
  );
};

const NetworkViewControllerFetcher = () => {
  const {
    data: rawLocations,
    error: errorLocations,
    isLoading: isLoadingLocations,
    isFetching: isFetchingLocations,
  } = useGetLocationsQuery(undefined);
  if (errorLocations) console.log('useGetLocationsQuery ~ error', errorLocations);

  const {
    data: rawMaterials,
    error: errorMaterials,
    isLoading: isLoadingMaterials,
    isFetching: isFetchingMaterials,
  } = useGetMaterialsQuery(undefined);
  if (errorMaterials) console.log('useGetMaterialsQuery ~ error', errorMaterials);

  const {
    data: rawLocationMaterials,
    error: errorLocationMaterials,
    isLoading: isLoadingLocationMaterials,
    isFetching: isFetchingLocationMaterials,
  } = useGetLocationMaterialsQuery(undefined);
  if (errorLocationMaterials) console.log('useGetLocationMaterialsQuery ~ error', errorLocationMaterials);

  if (
    isLoadingLocations ||
    isFetchingLocations ||
    isLoadingMaterials ||
    isFetchingMaterials ||
    isLoadingLocationMaterials ||
    isFetchingLocationMaterials
  )
    return null;

  return (
    <NetworkViewControllerContainer
      rawLocations={rawLocations}
      rawMaterials={rawMaterials}
      rawLocationMaterials={rawLocationMaterials}
    />
  );
};

export default NetworkViewControllerFetcher;
