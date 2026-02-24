import { GasMix } from './types';

export function calculateMOD(mix: GasMix, ppO2: number): number {
  if (mix.o2 <= 0) return 0;

  const fractionO2 = mix.o2 / 100;

  const depthMeters = (ppO2 / fractionO2 - 1) * 10;

  return Math.max(0, depthMeters);
}

export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}
