import { DimensionValue, Text, View } from 'react-native';

type LearnTopBarProps = {
  navTitle: string;
  progressWidth: DimensionValue;
};

function LearnTopBar({ navTitle, progressWidth }: LearnTopBarProps) {
  return (
    <View className="border-b border-zinc-800/80 bg-[#0d131a] px-4 pb-3">
      <View className="flex-row items-center justify-center">
        <Text className="text-2xl font-bold tracking-tight text-white">
          {navTitle}
        </Text>
      </View>
      <View className="mt-4 h-1 w-full overflow-hidden rounded-full bg-zinc-800">
        <View style={{ width: progressWidth }} className="h-full bg-cyan-400" />
      </View>
    </View>
  );
}

export default LearnTopBar;
