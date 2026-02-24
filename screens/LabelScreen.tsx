import { View, Text } from 'react-native';

function LabelScreen() {
  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-white text-2xl font-bold">Label</Text>
      <Text className="text-zinc-400 mt-2">
        This is a where the nitrox label will be generated. It will have the
        same info as the calculator screen, but in a more compact format.
      </Text>
    </View>
  );
}

export default LabelScreen;
