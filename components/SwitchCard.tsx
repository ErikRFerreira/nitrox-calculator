import * as Haptics from 'expo-haptics';
import { Switch, Text, View } from 'react-native';

type Props = {
  isTrimix: boolean;
  setIsTrimix: (isTrimix: boolean) => void;
  setHe: (he: number) => void;
};

function SwitchCard({ isTrimix, setIsTrimix, setHe }: Props) {
  return (
    <View
      className={`mt-6 flex-row items-center justify-between rounded-2xl border px-5 ${
        isTrimix
          ? 'border-[#0b2743] bg-[#08101d]'
          : 'border-[#001526]/80 bg-[#02070d]/95'
      }`}
      style={{
        shadowColor: '#0d8fbd',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: isTrimix ? 0.2 : 0.08,
        shadowRadius: isTrimix ? 16 : 8,
        elevation: isTrimix ? 6 : 2,
      }}
    >
      <View>
        <Text className="text-sm font-bold text-slate-100">Trimix Mode</Text>
      </View>

      <Switch
        value={isTrimix}
        trackColor={{ false: '#334155', true: '#1c91b7' }}
        thumbColor={isTrimix ? '#f8fafc' : '#e5e7eb'}
        ios_backgroundColor="#334155"
        style={{ transform: [{ scaleX: 1.18 }, { scaleY: 1.18 }] }}
        onValueChange={(next) => {
          setIsTrimix(next);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          if (!next) setHe(0); // key: returning to Nitrox
        }}
      />
    </View>
  );
}

export default SwitchCard;
