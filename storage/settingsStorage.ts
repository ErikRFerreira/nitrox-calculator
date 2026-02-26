import AsyncStorage from '@react-native-async-storage/async-storage';

export type Settings = {
  units: 'metric' | 'imperial';
  userName: string; // empty string allowed
};

const KEY = 'settings:v1';

const DEFAULTS: Settings = {
  units: 'metric',
  userName: '',
};

/**
 * Fetches settings from AsyncStorage. If no settings are found, returns defaults.
 *
 * @returns - A promise that resolves to the settings object.
 */
export async function getSettings(): Promise<Settings> {
  const raw = await AsyncStorage.getItem(KEY);
  if (!raw) return DEFAULTS;

  try {
    return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Settings>) };
  } catch {
    return DEFAULTS;
  }
}

/**
 * Saves the provided settings to AsyncStorage, overwriting any existing settings.
 *
 * @param next - The settings object to save.
 */
export async function saveSettings(next: Settings): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}
