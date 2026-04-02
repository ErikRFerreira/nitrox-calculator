import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  Settings,
} from './settingsStorage';

type UseSettingsOptions = {
  refreshOnFocus?: boolean;
};

export function useSettings(options: UseSettingsOptions = {}) {
  const { refreshOnFocus = true } = options;
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const hasLoadedOnMountRef = useRef(false);

  const loadSettings = useCallback(async () => {
    const next = await getSettings();
    setSettings(next);
  }, []);

  const refresh = useCallback(async () => {
    await loadSettings();
  }, [loadSettings]);

  const updateSettings = useCallback(async (next: Settings) => {
    setSettings(next);
    await saveSettings(next);
  }, []);

  useEffect(() => {
    const run = async () => {
      await loadSettings();
      hasLoadedOnMountRef.current = true;
    };

    void run();
  }, [loadSettings]);

  useFocusEffect(
    useCallback(() => {
      if (!refreshOnFocus) return;
      if (!hasLoadedOnMountRef.current) return;

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
    }, [refreshOnFocus]),
  );

  return { settings, refresh, updateSettings };
}
