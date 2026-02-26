import { useEffect, useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import SegmentedToggle from '../components/SegmentedToggle';
import { clearHistory } from '../storage/historyStorage';
import { useSettings } from '../storage/useSettings';

function SettingsScreen() {
  const { settings, updateSettings } = useSettings();
  const [draftName, setDraftName] = useState('');

  useEffect(() => {
    setDraftName(settings.userName);
  }, [settings.userName]);

  const saveName = async () => {
    const next = { ...settings, userName: draftName.trim() };
    await updateSettings(next);
    Alert.alert('Saved', 'Your name was updated.');
  };

  return (
    <View className="flex-1 p-6">
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
        onChange={(units) => {
          const next = { ...settings, units };
          void updateSettings(next);
        }}
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
