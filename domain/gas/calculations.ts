import { GasMix } from './types';

/**
 * Calculates the Maximum Operating Depth (MOD) for a given gas mix and partial pressure of oxygen (ppO2).
 *
 * @param mix - The gas mix, containing percentages of O2 and He.
 * @param ppO2 - The desired partial pressure of oxygen in atmospheres (e.g., 1.4 for recreational diving).
 * @returns The MOD in meters, clamped to a minimum of 0.
 */
export function calculateMOD(mix: GasMix, ppO2: number): number {
  if (mix.o2 <= 0) return 0;

  const fractionO2 = mix.o2 / 100;

  const depthMeters = (ppO2 / fractionO2 - 1) * 10;

  return Math.max(0, depthMeters);
}

/**
 * Converts a depth in meters to feet, ensuring the result is not negative.
 *
 * @param meters - The depth in meters to convert.
 * @returns - The equivalent depth in feet, clamped to a minimum of 0.
 */
export function metersToFeet(meters: number): number {
  return Math.max(0, meters * 3.28084);
}

/**
 * Calculates the Equivalent Narcotic Depth (END) for a given gas mix and depth in meters.
 *
 * @param mix - The gas mix, containing percentages of O2 and He.
 * @param depthMeters - The actual depth in meters at which the calculation is to be performed.
 * @returns The END in meters, clamped to a minimum of 0. If the gas mix is invalid (e.g., total percentage exceeds 100%), returns 0.
 */
export function calculateEND(mix: GasMix, depthMeters: number): number {
  const fo2 = mix.o2 / 100;
  const fhe = mix.he / 100;
  const fn2 = 1 - fo2 - fhe;

  // Guard: if mix is invalid, don’t produce nonsense
  if (fn2 < 0) return 0;

  const pressure = depthMeters / 10 + 1; // ATA
  const narcoticPressureEquivalent = (fn2 / 0.79) * pressure;

  const endMeters = (narcoticPressureEquivalent - 1) * 10;
  return Math.max(0, endMeters);
}
