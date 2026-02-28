export type DateFilterMode = 'single' | 'range';

export type DateFilter = {
  mode: DateFilterMode;
  startDate: string | null;
  endDate: string | null;
};

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function parseDateKey(dateKey: string): {
  year: number;
  monthIndex: number;
  day: number;
} | null {
  const parts = dateKey.split('-');
  if (parts.length !== 3) return null;

  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);

  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  return {
    year,
    monthIndex: month - 1,
    day,
  };
}

export function toLocalDateKey(timestampMs: number): string {
  const date = new Date(timestampMs);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${pad(month)}-${pad(day)}`;
}

export function getTodayLocalDateKey(): string {
  return toLocalDateKey(Date.now());
}

export function startOfLocalDayMs(dateKey: string): number {
  const parsed = parseDateKey(dateKey);
  if (!parsed) return Number.NaN;
  return new Date(parsed.year, parsed.monthIndex, parsed.day).getTime();
}

export function endOfLocalDayMs(dateKey: string): number {
  return startOfLocalDayMs(dateKey) + 86_399_999;
}

export function isEntryInDateFilter(entryMs: number, filter: DateFilter): boolean {
  if (!filter.startDate) return true;

  if (filter.mode === 'single' || !filter.endDate) {
    const start = startOfLocalDayMs(filter.startDate);
    const end = endOfLocalDayMs(filter.startDate);
    return entryMs >= start && entryMs <= end;
  }

  const startKey = filter.startDate <= filter.endDate
    ? filter.startDate
    : filter.endDate;
  const endKey = filter.startDate <= filter.endDate
    ? filter.endDate
    : filter.startDate;

  const start = startOfLocalDayMs(startKey);
  const end = endOfLocalDayMs(endKey);
  return entryMs >= start && entryMs <= end;
}

export function isFutureDateKey(dateKey: string, todayKey: string): boolean {
  return dateKey > todayKey;
}

export function getNextDraftDateFilter(
  current: DateFilter,
  selectedDate: string,
  todayKey: string,
): DateFilter {
  if (isFutureDateKey(selectedDate, todayKey)) {
    return current;
  }

  if (current.mode === 'single') {
    return {
      mode: 'single',
      startDate: selectedDate,
      endDate: null,
    };
  }

  if (!current.startDate || (current.startDate && current.endDate)) {
    return {
      mode: 'range',
      startDate: selectedDate,
      endDate: null,
    };
  }

  if (selectedDate < current.startDate) {
    return {
      mode: 'range',
      startDate: selectedDate,
      endDate: current.startDate,
    };
  }

  return {
    mode: 'range',
    startDate: current.startDate,
    endDate: selectedDate,
  };
}

export function withDateFilterMode(
  current: DateFilter,
  mode: DateFilterMode,
): DateFilter {
  if (mode === current.mode) return current;
  return {
    mode,
    startDate: current.startDate,
    endDate: mode === 'single' ? null : current.endDate,
  };
}

export function formatDateFilterLabel(filter: DateFilter): string | null {
  if (!filter.startDate) return null;

  const start = new Date(startOfLocalDayMs(filter.startDate));
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (filter.mode === 'single' || !filter.endDate) {
    return formatter.format(start);
  }

  const end = new Date(startOfLocalDayMs(filter.endDate));
  return `${formatter.format(start)} - ${formatter.format(end)}`;
}

export function buildMarkedDates(filter: DateFilter): Record<string, object> {
  if (!filter.startDate) return {};

  if (filter.mode === 'single' || !filter.endDate) {
    return {
      [filter.startDate]: {
        selected: true,
        selectedColor: '#22d3ee',
      },
    };
  }

  const startKey = filter.startDate <= filter.endDate
    ? filter.startDate
    : filter.endDate;
  const endKey = filter.startDate <= filter.endDate
    ? filter.endDate
    : filter.startDate;

  const marked: Record<string, object> = {};
  const cursor = new Date(startOfLocalDayMs(startKey));
  const end = startOfLocalDayMs(endKey);

  while (cursor.getTime() <= end) {
    const key = toLocalDateKey(cursor.getTime());
    const isStart = key === startKey;
    const isEnd = key === endKey;

    marked[key] = {
      color: '#0891b2',
      textColor: '#e0f2fe',
      startingDay: isStart,
      endingDay: isEnd,
    };

    cursor.setDate(cursor.getDate() + 1);
  }

  return marked;
}
