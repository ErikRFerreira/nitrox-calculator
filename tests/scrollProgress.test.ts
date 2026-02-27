import { calculateScrollProgress } from '../utils/scrollProgress';

describe('calculateScrollProgress', () => {
  test('returns 0 at top of scroll', () => {
    expect(calculateScrollProgress(0, 1500, 500)).toBe(0);
  });

  test('returns 1 at or beyond bottom of scroll', () => {
    expect(calculateScrollProgress(1000, 1500, 500)).toBe(1);
    expect(calculateScrollProgress(1200, 1500, 500)).toBe(1);
  });

  test('handles non-scrollable content safely', () => {
    expect(calculateScrollProgress(0, 500, 500)).toBe(0);
    expect(calculateScrollProgress(50, 500, 500)).toBe(1);
  });
});
