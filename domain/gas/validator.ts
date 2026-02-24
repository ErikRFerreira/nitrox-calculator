import { GasMix, Warning } from './types';

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
