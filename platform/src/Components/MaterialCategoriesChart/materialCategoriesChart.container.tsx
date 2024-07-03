import { useMemo, useState } from 'react';
import { TimeSeries } from '@Models';
import MaterialCategoriesChart from './materialCategoriesChart';

const MaterialCategoriesChartContainer = ({
  materialCategoryName,
  kpiName,
  timeSeries,
}: {
  materialCategoryName: string;
  kpiName: string;
  timeSeries: TimeSeries[];
}) => {
  const [timeRange, setTimeRange] = useState(3);

  const onTimeRangeChange = (selectedTimeRange: number) => {
    setTimeRange(selectedTimeRange);
  };

  const timeSeriesFromMaterialKpi = (ts: TimeSeries[], tr: number) => {
    const xAxis: string[] = [];
    const yAxis: number[] = [];
    [...ts] // TODO don't clone the array, we might store this in redux or send the data sorted from the backend
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .forEach(({ timestamp, value }) => {
        const dateComparison = new Date();
        dateComparison.setMonth(new Date().getMonth() - tr);
        if (new Date(timestamp).getTime() < dateComparison.getTime()) {
          return;
        }

        xAxis.push(timestamp);
        yAxis.push(+value);
      });
    return { xAxis, yAxis };
  };

  const { xAxis, yAxis } = useMemo(() => timeSeriesFromMaterialKpi(timeSeries, timeRange), [timeSeries, timeRange]);

  // TODO remove targetAxis calculation
  const targetAxis = [...yAxis];
  targetAxis.fill(Math.max(...yAxis.slice(2, 6)) * 0.95);

  const timeRanges = [
    { name: '6 Months', value: 6 },
    { name: '9 Months', value: 9 },
    { name: '12 Months', value: 12 },
  ];
  return (
    <MaterialCategoriesChart
      title={materialCategoryName}
      subtitle={kpiName}
      xAxis={xAxis}
      yAxis={yAxis}
      targetAxis={targetAxis}
      timeRanges={timeRanges}
      onTimeRangeChange={onTimeRangeChange}
    />
  );
};

export default MaterialCategoriesChartContainer;
