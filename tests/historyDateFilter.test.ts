import {
  DateFilter,
  getNextDraftDateFilter,
  isEntryInDateFilter,
  startOfLocalDayMs,
  toLocalDateKey,
} from '../utils/historyDateFilter';

describe('historyDateFilter', () => {
  test('toLocalDateKey returns local YYYY-MM-DD key', () => {
    const timestamp = new Date(2026, 0, 15, 13, 25, 0).getTime();
    expect(toLocalDateKey(timestamp)).toBe('2026-01-15');
  });

  test('single-day filter includes only entries from selected day', () => {
    const filter: DateFilter = {
      mode: 'single',
      startDate: '2026-02-20',
      endDate: null,
    };

    const inDay = new Date(2026, 1, 20, 14, 0, 0).getTime();
    const dayBefore = new Date(2026, 1, 19, 23, 59, 59).getTime();
    const dayAfter = new Date(2026, 1, 21, 0, 0, 0).getTime();

    expect(isEntryInDateFilter(inDay, filter)).toBe(true);
    expect(isEntryInDateFilter(dayBefore, filter)).toBe(false);
    expect(isEntryInDateFilter(dayAfter, filter)).toBe(false);
  });

  test('range filter includes start/end day boundaries (inclusive)', () => {
    const filter: DateFilter = {
      mode: 'range',
      startDate: '2026-02-10',
      endDate: '2026-02-12',
    };

    const startBoundary = startOfLocalDayMs('2026-02-10');
    const endBoundary = new Date(2026, 1, 12, 23, 59, 59, 999).getTime();
    const outside = new Date(2026, 1, 13, 0, 0, 0).getTime();

    expect(isEntryInDateFilter(startBoundary, filter)).toBe(true);
    expect(isEntryInDateFilter(endBoundary, filter)).toBe(true);
    expect(isEntryInDateFilter(outside, filter)).toBe(false);
  });

  test('range mode with only startDate behaves as single-day filter', () => {
    const filter: DateFilter = {
      mode: 'range',
      startDate: '2026-02-14',
      endDate: null,
    };

    const sameDay = new Date(2026, 1, 14, 10, 15, 0).getTime();
    const nextDay = new Date(2026, 1, 15, 10, 15, 0).getTime();

    expect(isEntryInDateFilter(sameDay, filter)).toBe(true);
    expect(isEntryInDateFilter(nextDay, filter)).toBe(false);
  });

  test('future date selections are ignored in draft selection helper', () => {
    const current: DateFilter = {
      mode: 'single',
      startDate: '2026-02-20',
      endDate: null,
    };

    const next = getNextDraftDateFilter(current, '2026-03-01', '2026-02-28');
    expect(next).toEqual(current);
  });
});
