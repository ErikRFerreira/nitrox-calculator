/**
 * Converts meters to feet.
 *
 * @param meters - The depth in meters to convert to feet.
 * @returns - The equivalent depth in feet.
 */
export function metersToFeet(meters: number): number {
  return meters * 3.28084;
}

/**
 * Formats a depth value for display based on the specified units.
 *
 * @param meters - The depth in meters to format.
 * @param units - The unit system to use for formatting ('metric' or 'imperial').
 * @returns - An object containing the primary and secondary formatted depth strings.
 */
export function formatDepth(meters: number, units: 'metric' | 'imperial') {
  if (units === 'imperial') {
    return {
      primary: `${metersToFeet(meters).toFixed(0)} ft`,
      secondary: `${meters.toFixed(1)} m`,
    };
  }

  return {
    primary: `${meters.toFixed(1)} m`,
    secondary: `${metersToFeet(meters).toFixed(0)} ft`,
  };
}
