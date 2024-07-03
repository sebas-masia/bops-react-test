import { KPITimeSeries } from './kpi';

export interface MaterialCategoryKpis {
  id: string;
  name: string;
  kpis: KPITimeSeries[];
}
