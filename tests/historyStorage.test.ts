import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  addHistoryEntry,
  clearHistory,
  getHistory,
} from '../storage/historyStorage';

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const HISTORY_KEY = 'history:v1';

describe('historyStorage', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await clearHistory();
  });

  test('returns empty array and clears key when JSON is malformed', async () => {
    await AsyncStorage.setItem(HISTORY_KEY, '{bad-json');

    const history = await getHistory();

    expect(history).toEqual([]);
    expect(await AsyncStorage.getItem(HISTORY_KEY)).toBeNull();
  });

  test('returns empty array and clears key when payload is not an array', async () => {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify({ foo: 'bar' }));

    const history = await getHistory();

    expect(history).toEqual([]);
    expect(await AsyncStorage.getItem(HISTORY_KEY)).toBeNull();
  });

  test('preserves entries when addHistoryEntry is called concurrently', async () => {
    const entryA = {
      id: '1',
      createdAtMs: 1,
      diverName: 'A',
      o2: 32,
      he: 0,
      ppO2: 1.4,
      modMeters: 33.75,
    };
    const entryB = {
      id: '2',
      createdAtMs: 2,
      diverName: 'B',
      o2: 21,
      he: 35,
      ppO2: 1.4,
      modMeters: 56.67,
      endMeters: 29.11,
    };

    await Promise.all([addHistoryEntry(entryA), addHistoryEntry(entryB)]);

    const history = await getHistory();

    expect(history).toHaveLength(2);
    expect(history.map((entry) => entry.id).sort()).toEqual(['1', '2']);
  });
});
