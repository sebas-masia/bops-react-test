import { useState } from 'react';
import { KPIEntry } from '@Models';
import MaterialKpiSelect from './component';

const MaterialKpiSelectContainer = ({ kpis }) => {
  const locations = Object.keys(kpis).map((kpi) => ({ value: kpi, label: kpi }));

  const kpisMap = Object.entries(kpis).map(([id, metric]) => ({
    id,
    metric: Object.entries(metric as any).map(([metricId, values]) => ({
      id: metricId,
      ...(values as any),
    })) as KPIEntry[],
  }));

  const getMetrics = (location) => {
    const data = kpisMap.find(({ id }) => id === location)?.metric;
    console.log(data);
    if (!data) return [];

    return Object.entries(data).map(([id, metric]) => ({ id, metric }));
  };

  const [selectedLocation, setSelectedLocation] = useState('Network');
  const [metrics, setMetrics] = useState((() => getMetrics(selectedLocation))());

  const onLocationChange = (selected) => {
    setMetrics(getMetrics(selected.value));
    setSelectedLocation(selected.value);
  };

  return <MaterialKpiSelect locations={locations} onLocationChange={onLocationChange} metrics={metrics} />;
};

export default MaterialKpiSelectContainer;
