import { View, Text } from 'react-native';

/*
 theme: {
                extend: {
                    colors: {
                        "primary": "#167b9c",
                        "background-light": "#f9fafa",
                        "background-dark": "#0f1113",
                        "surface-dark": "#1c1f22",
                        "border-dark": "#2d3238",
                        "amber-alert": "#d97706"
                    },
                    fontFamily: {
                        "display": ["Manrope", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                },
            },
*/

type Props = {
  endMeters: number | null;
};

function ENDview({ endMeters }: Props) {
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
      <Text className="text-2xl font-bold text-slate-400">
        {endMeters !== null ? `${endMeters.toFixed(1)} m` : '--'}
      </Text>
    </View>
  );
}

export default ENDview;
