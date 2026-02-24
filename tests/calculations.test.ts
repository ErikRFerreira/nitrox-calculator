import { calculateMOD, metersToFeet } from '../domain/gas/calculations';
import { validateMix } from '../domain/gas/validator';

describe('Gas domain', () => {
  describe('validateMix', () => {
    // Reject mixes where the total gas percentage exceeds 100%.
    test('returns an error when O2 + He is greater than 100', () => {
      const warnings = validateMix({ o2: 70, he: 40 });
      expect(warnings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'error' }),
        ]),
      );
    });

    // Reject mixes containing negative percentages.
    test('returns an error when O2 is negative', () => {
      const warnings = validateMix({ o2: -1, he: 20 });
      expect(warnings).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ type: 'error' }),
        ]),
      );
    });

    // Accept valid mixes without warnings.
    test('returns no warnings for a valid mix', () => {
      const warnings = validateMix({ o2: 32, he: 20 });
      expect(warnings).toEqual([]);
    });
  });

  describe('calculateMOD', () => {
    // Common recreational nitrox reference values.
    test('returns expected MOD for EAN32 at ppO2 1.4', () => {
      const mod = calculateMOD({ o2: 32, he: 0 }, 1.4);
      expect(mod).toBeCloseTo(33.75, 2);
    });

    // Higher oxygen mixes produce a shallower MOD.
    test('returns expected MOD for EAN36 at ppO2 1.4', () => {
      const mod = calculateMOD({ o2: 36, he: 0 }, 1.4);
      expect(mod).toBeCloseTo(28.89, 2);
    });

    // A zero-oxygen input is invalid for MOD and is clamped to 0.
    test('returns 0 when O2 is 0', () => {
      const mod = calculateMOD({ o2: 0, he: 0 }, 1.4);
      expect(mod).toBe(0);
    });

    // Negative depth results are clamped to surface depth (0 m).
    test('returns 0 when ppO2 is below the oxygen fraction in the mix', () => {
      const mod = calculateMOD({ o2: 36, he: 0 }, 0.3);
      expect(mod).toBe(0);
    });
  });

  describe('metersToFeet', () => {
    // Sanity check against the standard meters-to-feet conversion.
    test('converts meters to feet', () => {
      expect(metersToFeet(10)).toBeCloseTo(32.8084, 4);
    });

    // Surface depth should stay zero after conversion.
    test('returns 0 for 0 meters', () => {
      expect(metersToFeet(0)).toBe(0);
    });
  });
});
