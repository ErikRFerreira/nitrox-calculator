import * as Haptics from 'expo-haptics';
import { useRef } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

function StepperInput({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
}: Props) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const valueRef = useRef(value);
  valueRef.current = value;

  const stopInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const decrease = () => {
    const next = Math.max(min, valueRef.current - step);
    if (next !== valueRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onChange(next);
  };

  const increase = () => {
    const next = Math.min(max, valueRef.current + step);
    if (next !== valueRef.current) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onChange(next);
  };

  const startLongPress = (direction: 'inc' | 'dec') => {
    intervalRef.current = setInterval(() => {
      if (direction === 'inc') increase();
      else decrease();
    }, 100);
  };

  return (
    <View className="mt-6">
      <Text className="text-zinc-400 mb-2">{label}</Text>
      <View className="flex-row items-center justify-between bg-zinc-900 p-3 rounded-xl">
        <TouchableOpacity
          className="bg-zinc-800 rounded-xl w-14 h-14 items-center justify-center"
          onPress={decrease}
          onLongPress={() => startLongPress('dec')}
          onPressOut={stopInterval}
        >
          <Text className="text-[#33C4E3] text-xl font-bold">−</Text>
        </TouchableOpacity>

        <Text className="text-white text-4xl font-bold">{value}%</Text>

        <TouchableOpacity
          className="bg-zinc-800 rounded-xl w-14 h-14 items-center justify-center"
          onPress={increase}
          onLongPress={() => startLongPress('inc')}
          onPressOut={stopInterval}
        >
          <Text className="text-[#33C4E3] text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default StepperInput;
