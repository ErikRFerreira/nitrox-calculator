import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import SegmentedToggle from '../components/SegmentedToggle';
import { clearHistory } from '../storage/historyStorage';
import { useSettings } from '../storage/useSettings';

function SettingsScreen() {
  const { settings, updateSettings } = useSettings();
  const [draftName, setDraftName] = useState('');
  const MAX_NAME_LENGTH = 14;

  useEffect(() => {
    setDraftName(settings.userName);
  }, [settings.userName]);

  const saveName = async () => {
    const next = { ...settings, userName: draftName.trim() };
    await updateSettings(next);
    Alert.alert('Saved', 'Your name was updated.');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-center text-2xl font-bold mt-6 text-white">
          Settings
        </Text>

        <Text className="mt-6 text-zinc-500 text-xs font-bold uppercase tracking-[2px] mb-3">
          User Profile
        </Text>

        <View className="bg-[#1c1f22]/20 border border-[#0f1113] p-3 rounded-xl mx-[-12px] flex flex-col gap-4">
          <Text className="text-zinc-500 mt-2 px-1">
            This name will appear on the tank label when creating a new entry.
          </Text>

          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#71717a"
            value={draftName}
            onChangeText={(text) => setDraftName(text.slice(0, MAX_NAME_LENGTH))}
            maxLength={MAX_NAME_LENGTH}
            className="bg-zinc-900 rounded-xl p-4 text-white"
          />
          <Text className="text-right text-xs text-zinc-500 px-1">
            max {MAX_NAME_LENGTH} characters
          </Text>

          <TouchableOpacity
            onPress={saveName}
            className=" bg-[#0493c6]/80 rounded-xl p-4 items-center"
          >
            <Text className="text-white font-semibold">Update Name</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-zinc-500 mt-6 text-xs font-bold uppercase tracking-[2px] mb-3">
          Units
        </Text>

        <View className="bg-[#1c1f22]/20 border border-[#0f1113] p-3 rounded-xl mx-[-12px] flex flex-col gap-4">
          <SegmentedToggle
            options={[
              { label: 'Metric (C, m)', value: 'metric' },
              { label: 'Imperial (F, ft)', value: 'imperial' },
            ]}
            value={settings.units}
            onChange={(units) => {
              const next = { ...settings, units };
              void updateSettings(next);
            }}
          />
        </View>

        <Text className="text-zinc-500 mb-3 text-xs font-bold uppercase tracking-[2px] mt-6">
          Data management
        </Text>

        <View className="bg-[#1c1f22]/20 border border-[#0f1113] p-3 rounded-xl mx-[-12px] flex flex-col gap-4">
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
            className="bg-zinc-900 rounded-2xl p-4 items-center border border-red-500/30 flex-row justify-center gap-2"
          >
            <Feather name="trash-2" size={16} color="#ef4444" />
            <Text className="text-red-400 font-bold text-lg">
              Delete all history
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SettingsScreen;
