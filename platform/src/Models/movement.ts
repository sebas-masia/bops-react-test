export interface Movement {
  source_location_id: string;
  timestamp: Date;
  process_group: string;
  sales_order_number: string;
  country_code: string;
  movement_type: string;
  id: number;
  document_number: string;
  material_id: string;
  uom: string;
  destination_location_id: string;
  quantity: number;
}
