import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryEntry } from './types';

const KEY = 'history:v1';

type RawHistoryEntry = Omit<HistoryEntry, 'createdAtMs'> & {
  createdAtMs?: number;
};

function parseLegacyDate(dateString?: string): number | null {
  if (!dateString) return null;

  const match = /^(\d{2})\/(\d{2})\/(\d{2})$/.exec(dateString.trim());
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = 2000 + Number(match[3]);
  const parsed = new Date(year, month - 1, day).getTime();

  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeEntry(entry: RawHistoryEntry): HistoryEntry {
  if (typeof entry.createdAtMs === 'number' && Number.isFinite(entry.createdAtMs)) {
    return entry as HistoryEntry;
  }

  const numericId = Number(entry.id);
  if (Number.isFinite(numericId)) {
    return { ...entry, createdAtMs: numericId };
  }

  const legacyFromCreatedAt = parseLegacyDate(entry.createdAt);
  if (legacyFromCreatedAt !== null) {
    return { ...entry, createdAtMs: legacyFromCreatedAt };
  }

  return { ...entry, createdAtMs: Date.now() };
}

/**
 * Fetches the history of generated labels from AsyncStorage.
 *
 * @returns - An array of HistoryEntry objects, sorted with the newest entry first. If no history exists, returns an empty array.
 */
export async function getHistory(): Promise<HistoryEntry[]> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return [];

  const parsed = JSON.parse(raw) as RawHistoryEntry[];
  const normalized = parsed.map(normalizeEntry);
  normalized.sort((a, b) => b.createdAtMs - a.createdAtMs);

  const needsMigration = normalized.some((entry, index) => {
    const original = parsed[index];
    return original.createdAtMs !== entry.createdAtMs;
  });

  if (needsMigration) {
    await AsyncStorage.setItem(KEY, JSON.stringify(normalized));
  }

  return normalized;
}

/**
 * Adds a new entry to the history of generated labels in AsyncStorage. The new entry is added to the beginning of the history array, ensuring that the most recent entries are listed first.
 *
 * @param entry - The HistoryEntry object to be added to the history. This should include all relevant details such as gas mix, MOD, END, and any optional notes or diver name.
 */
export async function addHistoryEntry(entry: HistoryEntry): Promise<void> {
  const existing = await getHistory();
  const next = [entry, ...existing]; // newest first
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

/**
 * Deletes a specific entry from the history of generated labels in AsyncStorage based on its unique identifier. This allows users to remove individual entries without affecting the rest of their history.
 *
 * @param id - The unique identifier of the history entry to be deleted. This should correspond to the 'id' property of the HistoryEntry object that was previously added to the history.
 */
export async function deleteHistoryEntry(id: string): Promise<void> {
  const existing = await getHistory();
  const next = existing.filter((e) => e.id !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}

/**
 * Clears the entire history of generated labels from AsyncStorage. This action is irreversible, so it should be used with caution.
 *
 */
export async function clearHistory(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
