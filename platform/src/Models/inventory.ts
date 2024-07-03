export interface InventoryEntry {
  total: number;
  timestamp: Date | string;
}

export interface Inventory {
  id: string;
  entries: InventoryEntry[];
}
