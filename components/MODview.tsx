import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { Units } from '../domain/gas/types';
import { formatDepth } from '../utils/units';

type Props = {
  modMeters: number | null;
  hasError: boolean;
  ppO2: number;
  units: Units;
};

function MODview({ modMeters, hasError, ppO2, units }: Props) {
  const pulse = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [pulse]);

  const numberGlowStyle = useAnimatedStyle(() => {
    const shouldGlow = !hasError && modMeters !== null;
    const alpha = shouldGlow ? 0.34 + pulse.value * 0.46 : 0;
    const radius = shouldGlow ? 22 + pulse.value * 20 : 0;

    return {
      textShadowColor: `rgba(8, 145, 178, ${alpha})`,
      textShadowRadius: radius,
      textShadowOffset: { width: 0, height: 0 },
    };
  }, [hasError, modMeters]);

  const glowLayerStyle = useAnimatedStyle(() => {
    const shouldGlow = !hasError && modMeters !== null;
    const opacity = shouldGlow ? 0.22 + pulse.value * 0.42 : 0;

    return {
      opacity,
      transform: [{ scale: shouldGlow ? 1.0 + pulse.value * 0.035 : 1 }],
      textShadowColor: 'rgba(8, 145, 178, 0.95)',
      textShadowRadius: 30 + pulse.value * 28,
      textShadowOffset: { width: 0, height: 0 },
    };
  }, [hasError, modMeters]);

  const formatted = modMeters !== null ? formatDepth(modMeters, units) : null;
  const primary = formatted?.primary ?? '';
  const lastSpaceIdx = primary.lastIndexOf(' ');
  const modLabel =
    modMeters !== null
      ? lastSpaceIdx > 0
        ? primary.slice(0, lastSpaceIdx)
        : primary
      : '--';
  const modUnit =
    modMeters !== null && lastSpaceIdx > 0
      ? primary.slice(lastSpaceIdx + 1)
      : '';
  const modSecondaryLabel =
    modMeters !== null ? (formatted?.secondary ?? '') : '';

  return (
    <View
      className="mt-4 overflow-hidden rounded-[32px] border border-[#0b2743]"
      style={{
        shadowColor: '#0d8fbd',
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
      }}
    >
      <LinearGradient
        colors={['#07101a', '#02070d']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      <View className="items-center px-6 py-10">
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
            {modUnit}
          </Text>
        </View>

        <Text
          className={`${hasError ? 'text-zinc-700' : 'text-slate-500'} mt-2 text-2xl`}
        >
          {modSecondaryLabel}
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
    </View>
  );
}

export default MODview;
