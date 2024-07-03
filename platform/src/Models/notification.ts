export interface Notification {
  materialId: string;
  alert: string;
  status: 'Open' | 'FollowUp' | 'Pass';
  material: string;
  location: string;
  kpiName: string;
  timestamp: string;
  action?: string;
}
