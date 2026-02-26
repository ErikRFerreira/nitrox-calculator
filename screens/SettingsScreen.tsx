import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import SegmentedToggle from '../components/SegmentedToggle';
import { clearHistory } from '../storage/historyStorage';
import {
  getSettings,
  saveSettings,
  Settings,
} from '../storage/settingsStorage';

function SettingsScreen() {
  const [settings, setSettings] = useState<Settings>({
    units: 'metric',
    userName: '',
  });

  const [draftName, setDraftName] = useState('');

  useEffect(() => {
    const load = async () => {
      const s = await getSettings();
      setSettings(s);
      setDraftName(s.userName);
    };
    load();
  }, []);

  const saveName = async () => {
    const next = { ...settings, userName: draftName.trim() };
    setSettings(next);
    await saveSettings(next);
    Alert.alert('Saved', 'Your name was updated.');
  };

  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-center text-2xl font-bold mt-6 text-white">
        Settings
      </Text>

      <Text className="text-zinc-400 mt-6 mb-2">Your name</Text>

      <Text className="text-zinc-500 mb-3">
        This name will appear on the tank label when creating a new entry.
      </Text>

      <TextInput
        placeholder="Enter your name"
        placeholderTextColor="#71717a"
        value={draftName}
        onChangeText={setDraftName}
        className="bg-zinc-900 rounded-xl p-4 text-white"
      />

      <TouchableOpacity
        onPress={saveName}
        className="mt-4 bg-[#0493c6]/80 rounded-xl p-4 items-center"
      >
        <Text className="text-white font-semibold">Save name</Text>
      </TouchableOpacity>

      <Text className="text-zinc-400 mt-6 mb-2">Units</Text>
      <SegmentedToggle
        options={[
          { label: 'Metric', value: 'metric' },
          { label: 'Imperial', value: 'imperial' },
        ]}
        value={settings.units}
        onChange={(units) => setSettings({ ...settings, units })}
      />

      <View className="mt-10">
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Delete all history?',
              'This will permanently remove all saved entries.',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    await clearHistory();
                    Alert.alert('History deleted', 'All entries were removed.');
                  },
                },
              ],
            );
          }}
          className="bg-zinc-900 rounded-2xl p-4 items-center border border-red-500/30"
        >
          <Text className="text-red-300 font-bold text-lg">
            Delete all history
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SettingsScreen;
