import { View, Text } from 'react-native';

function HistoryScreen() {
  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-white text-2xl font-bold">History</Text>
      <Text className="text-zinc-400 mt-2">
        Saved calculations will appear here.
      </Text>
    </View>
  );
}

export default HistoryScreen;
