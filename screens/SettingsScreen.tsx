import { View, Text } from 'react-native';

function SettingsScreen() {
  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-white text-2xl font-bold">Settings</Text>
      <Text className="text-zinc-400 mt-2">
        Units, default ppO2, disclaimer.
      </Text>
    </View>
  );
}

export default SettingsScreen;
