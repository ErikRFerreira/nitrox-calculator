import { View, Text } from 'react-native';

function CalculatorScreen() {
  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-white text-2xl font-bold">Calculator</Text>
      <Text className="text-zinc-400 mt-2">Nitrox + Trimix calculator</Text>
    </View>
  );
}

export default CalculatorScreen;
