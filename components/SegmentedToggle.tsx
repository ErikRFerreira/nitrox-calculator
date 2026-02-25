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
    <View className="flex-row bg-zinc-900 rounded-xl p-1 mt-6">
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <TouchableOpacity
            key={String(opt.value)}
            onPress={() => onChange(opt.value)}
            className={`flex-1 py-2 rounded-lg ${active ? 'bg-zinc-800' : ''}`}
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
