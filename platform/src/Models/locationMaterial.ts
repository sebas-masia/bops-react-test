import { MaterialCategoryKpis } from './materialCategory';
import { KPITimeSeries } from './kpi';

export interface LocationMaterialCategory {
  id: string;
  name: string;
  materialCategoriesKpis: MaterialCategoryKpis[];
}

export interface LocationMaterialKpiEvents {
  locationId: string;
  materialId: string;
  kpis: {
    [kpiId: string]: KPITimeSeries;
  };
}
