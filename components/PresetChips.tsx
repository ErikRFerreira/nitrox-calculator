import { Text, TouchableOpacity, View } from 'react-native';

type Preset = {
  label: string;
  o2: number;
  he: number;
};

type Props = {
  presets: Preset[];
  onSelect: (o2: number, he: number) => void;
};

function PresetChips({ presets, onSelect }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2 mt-6">
      {presets.map((preset) => (
        <TouchableOpacity
          key={preset.label}
          onPress={() => onSelect(preset.o2, preset.he)}
          className="bg-zinc-900 px-4 py-2 rounded-full"
        >
          <Text className="text-teal-400 font-semibold">{preset.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default PresetChips;
