import { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  modMeters: number | null;
  modFeet: number | null;
  hasError: boolean;
  ppO2: number;
};

function MODview({ modMeters, modFeet, hasError, ppO2 }: Props) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const numberGlowStyle = useAnimatedStyle(() => {
    const shouldGlow = !hasError && modMeters !== null;
    const alpha = shouldGlow ? 0.2 + pulse.value * 0.35 : 0;
    const radius = shouldGlow ? 16 + pulse.value * 14 : 0;

    return {
      textShadowColor: `rgba(8, 145, 178, ${alpha})`,
      textShadowRadius: radius,
      textShadowOffset: { width: 0, height: 0 },
    };
  }, [hasError, modMeters]);

  const glowLayerStyle = useAnimatedStyle(() => {
    const shouldGlow = !hasError && modMeters !== null;
    const opacity = shouldGlow ? 0.12 + pulse.value * 0.28 : 0;

    return {
      opacity,
      transform: [{ scale: shouldGlow ? 1.0 + pulse.value * 0.015 : 1 }],
      textShadowColor: 'rgba(8, 145, 178, 0.95)',
      textShadowRadius: 22 + pulse.value * 18,
      textShadowOffset: { width: 0, height: 0 },
    };
  }, [hasError, modMeters]);

  const modLabel = modMeters !== null ? modMeters.toFixed(1) : '--';
  const modFeetLabel = modFeet !== null ? `${modFeet.toFixed(1)} ft` : '';

  return (
    <View className="mt-4 items-center overflow-hidden rounded-[32px] border border-[#001526]/80 bg-[#02070d]/95 px-6 py-10">
      <Text className="mb-6 text-xs font-bold uppercase tracking-[4px] text-[#0493c6]">
        Max Operating Depth
      </Text>

      <View className="flex-row items-end justify-center">
        <View className="relative items-center justify-center">
          <Animated.Text
            style={glowLayerStyle}
            className={`absolute text-[92px] font-extrabold leading-[96px] tracking-tight ${hasError ? 'text-zinc-600' : 'text-[#0493c6]'}`}
          >
            {modLabel}
          </Animated.Text>
          <Animated.Text
            style={numberGlowStyle}
            className={`text-[92px] font-extrabold leading-[96px] tracking-tight ${hasError ? 'text-zinc-600' : 'text-zinc-100'}`}
          >
            {modLabel}
          </Animated.Text>
        </View>
        <Text
          className={`ml-2 mb-3 text-6xl font-semibold ${hasError ? 'text-zinc-700' : 'text-[#0493c6]'}`}
        >
          m
        </Text>
      </View>

      <Text
        className={`${hasError ? 'text-zinc-700' : 'text-slate-500'} mt-2 text-2xl`}
      >
        {modFeetLabel}
      </Text>

      {ppO2 === 1.6 && (
        <View className="mt-6 w-full flex-row items-center justify-center rounded-full border border-amber-600/35 bg-amber-950/30 px-2 py-2">
          <Text className="mr-2 text-base text-amber-500">!</Text>
          <Text className="text-[8px] font-semibold uppercase tracking-wide text-amber-500">
            Typically used for contingency or decompression
          </Text>
        </View>
      )}
    </View>
  );
}

export default MODview;
