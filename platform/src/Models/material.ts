import { Inventory } from './inventory';
import { ProcessGroup } from './processGroup';
import { KPI } from './kpi';
import { Movement } from './movement';

export interface Material {
  id: string;
  uom: string;
  name: string;
  type: string;
  lifecycle: string;
  unit_cost: string;
  unit_sales_price: string;
  kpis: KPI[];
  movements: Movement[];
}
