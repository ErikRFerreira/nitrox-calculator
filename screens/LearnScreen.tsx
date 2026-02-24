import { View, Text } from 'react-native';

function LearnScreen() {
  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-white text-2xl font-bold">Learn</Text>
      <Text className="text-zinc-400 mt-2">Articles loaded from JSON.</Text>
    </View>
  );
}

export default LearnScreen;
