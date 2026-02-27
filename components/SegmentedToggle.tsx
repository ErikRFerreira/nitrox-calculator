import * as Haptics from 'expo-haptics';
import { Text, TouchableOpacity, View } from 'react-native';

type Option<T extends string | number> = {
  label: string;
  value: T;
};

type Props<T extends string | number> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

function SegmentedToggle<T extends string | number>({
  options,
  value,
  onChange,
}: Props<T>) {
  return (
    <View className="flex-row bg-zinc-900 rounded-xl">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <TouchableOpacity
            key={String(opt.value)}
            onPress={() => {
              Haptics.selectionAsync();
              onChange(opt.value);
            }}
            className={`flex-1 py-3 rounded-lg ${active ? 'bg-[#167b9c]/80' : ''}`}
          >
            <Text
              className={`text-center text-sm font-bold ${active ? 'text-white' : 'text-zinc-400'}`}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default SegmentedToggle;
