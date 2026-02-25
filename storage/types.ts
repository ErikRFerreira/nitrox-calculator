export type HistoryEntry = {
  id: string;
  createdAt: string; // ISO string
  o2: number;
  he: number;
  ppO2: number;
  modMeters: number;
  endMeters?: number;
};
