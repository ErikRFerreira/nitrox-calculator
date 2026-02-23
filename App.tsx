import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-zinc-950">
      <Text className="text-white text-xl font-bold">NativeWind works ✅</Text>
      <Text className="text-zinc-400 mt-2">Nitrox app coming up…</Text>
      <StatusBar style="light" />
    </View>
  );
}
