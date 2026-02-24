import { GasMix, Warning } from './types';

/**
 * Validates a gas mix to ensure that the percentages of O₂ and He are within acceptable limits.
 *
 * @param mix - The gas mix to validate, containing percentages of O₂ and He.
 * @returns An array of warnings, which may include errors if the mix is invalid.
 */
export function validateMix(mix: GasMix): Warning[] {
  const warnings: Warning[] = [];

  if (mix.o2 < 0 || mix.he < 0) {
    warnings.push({
      type: 'error',
      message: 'Gas percentages cannot be negative.',
    });
  }

  if (mix.o2 + mix.he > 100) {
    warnings.push({
      type: 'error',
      message: 'O₂ + He cannot exceed 100%.',
    });
  }

  return warnings;
}
