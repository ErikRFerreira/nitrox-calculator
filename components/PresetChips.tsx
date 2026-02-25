import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';

type Preset = {
  label: string;
  o2: number;
  he: number;
};

type Props = {
  presets: Preset[];
  activeO2: number;
  activeHe: number;
  onSelect: (o2: number, he: number) => void;
};

function PresetChips({ presets, activeO2, activeHe, onSelect }: Props) {
  return (
    <View className="flex-row flex-wrap gap-2 mt-2 justify-between">
      {presets.map((preset) => {
        const isActive = preset.o2 === activeO2 && preset.he === activeHe;
        return (
          <TouchableOpacity
            key={preset.label}
            onPress={() => {
              onSelect(preset.o2, preset.he);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            className={`px-2 py-3 rounded-xl flex-1 border border-teal-900 ${isActive ? 'bg-teal-900' : 'bg-zinc-900'}`}
          >
            <Text className="text-teal-400 font-semibold text-center">
              {preset.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default PresetChips;
