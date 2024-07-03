export interface KPITimeSeries {
  id: string;
  name: string;
  longName: string;
  uom: string;
  kpiType: string;
  timeValues: TimeSeries[];
}

export interface KPIEntry {
  id: string;
  title: string;
  expected: number;
  calculated: number;
  uom: string;
}

export interface KPIEvent {
  id: string;
  kpiEntries: KPIEntry[];
}

export interface KPI {
  id: string;
  kpiEvents: KPIEvent[];
}

export interface TimeSeries {
  timestamp: string;
  value: string | number;
}
