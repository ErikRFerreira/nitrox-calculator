import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  Settings,
} from './settingsStorage';

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  const refresh = useCallback(async () => {
    const next = await getSettings();
    setSettings(next);
  }, []);

  const updateSettings = useCallback(async (next: Settings) => {
    setSettings(next);
    await saveSettings(next);
  }, []);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const load = async () => {
        const next = await getSettings();
        if (isActive) {
          setSettings(next);
        }
      };

      void load();

      return () => {
        isActive = false;
      };
    }, []),
  );

  return { settings, refresh, updateSettings };
}
