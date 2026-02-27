import { Text, View } from 'react-native';

import { Units } from '../domain/gas/types';
import { formatDepth } from '../utils/units';

type Props = {
  endMeters: number | null;
  units: Units;
};

function ENDview({ endMeters, units }: Props) {
  const formatted = endMeters !== null ? formatDepth(endMeters, units) : null;

  return (
    <View className="mt-6 bg-[#1c1f22]/20 border border-[#0f1113] px-5 py-4 rounded-xl flex-row items-center justify-between">
      <View>
        <Text className="text-sx font-bold text-slate-500 uppercase tracking-widest">
          END
        </Text>
        <Text className="text-[10px] text-slate-500 uppercase">
          Equivalent Narcotic Depth
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-2xl font-bold text-slate-400">
          {formatted?.primary ?? '--'}
        </Text>
        <Text className="text-xs text-slate-500">{formatted?.secondary}</Text>
      </View>
    </View>
  );
}

export default ENDview;
