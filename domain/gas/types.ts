export type GasMix = {
  o2: number; // percentage
  he: number; // percentage
};

export type Units = 'metric' | 'imperial';

export type CalcInputs = {
  mix: GasMix;
  ppO2: number;
  units: Units;
};

export type Warning = {
  type: 'error' | 'info';
  message: string;
};

export type CalcResult = {
  modMeters: number;
  modFeet: number;
  eadMeters?: number;
  endMeters?: number;
  warnings: Warning[];
};
