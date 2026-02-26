import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { CalculatorStackParamList } from '../app/CalculatorStack';

import MODview from '../components/MODview';
import PresetChips from '../components/PresetChips';
import SegmentedToggle from '../components/SegmentedToggle';
import StepperInput from '../components/StepperInput';
import SwitchCard from '../components/SwitchCard';
import {
  calculateEND,
  calculateMOD,
  metersToFeet,
} from '../domain/gas/calculations';
import {
  DEFAULT_HE,
  DEFAULT_O2,
  DEFAULT_PPO2,
  DEFAULT_TRIMIX_HE,
} from '../domain/gas/constants';
import { validateMix } from '../domain/gas/validators';
import ENDview from '../components/ENDview';

type Nav = NativeStackNavigationProp<
  CalculatorStackParamList,
  'CalculatorMain'
>;

function CalculatorScreen() {
  const navigation = useNavigation<Nav>();
  const [o2, setO2] = useState(DEFAULT_O2);
  const [he, setHe] = useState(DEFAULT_HE);
  const [ppO2, setPpO2] = useState(DEFAULT_PPO2);
  const [isTrimix, setIsTrimix] = useState(false);

  const mix = { o2, he };
  const warnings = validateMix(mix);
  const hasError = warnings.some((w) => w.type === 'error');

  const modMeters = hasError ? null : calculateMOD(mix, ppO2);
  const modFeet = modMeters === null ? null : metersToFeet(modMeters);
  const effectiveHe = isTrimix ? he : 0;

  const endMeters =
    !hasError && isTrimix && modMeters !== null
      ? calculateEND(mix, modMeters)
      : null;

  const setO2Safe = (nextO2: number) => {
    setO2(nextO2);
    setHe((prevHe) => Math.max(0, Math.min(prevHe, 100 - nextO2)));
  };

  const setHeSafe = (nextHe: number) => {
    setHe(Math.max(0, Math.min(nextHe, 100 - o2)));
  };

  const handleSetIsTrimix = (next: boolean) => {
    setIsTrimix(next);
    if (next) {
      setO2(DEFAULT_O2);
      setHe(DEFAULT_TRIMIX_HE);
    } else {
      setO2(DEFAULT_O2);
      setHe(DEFAULT_HE);
    }
  };

  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <SegmentedToggle
        options={[
          { label: 'ppO2 1.4', value: 1.4 },
          { label: 'ppO2 1.6', value: 1.6 },
        ]}
        value={ppO2}
        onChange={setPpO2}
      />

      <MODview
        modMeters={modMeters}
        modFeet={modFeet}
        hasError={hasError}
        ppO2={ppO2}
      />

      {hasError && (
        <View className="mt-4 bg-zinc-900 rounded-xl p-4 border border-red-500/30">
          {warnings
            .filter((w) => w.type === 'error')
            .map((w, idx) => (
              <Text key={idx} className="text-red-300">
                {w.message}
              </Text>
            ))}
        </View>
      )}

      <StepperInput
        label="Oxygen (O2)"
        value={o2}
        onChange={setO2Safe}
        min={21}
        max={100}
      />

      <PresetChips
        presets={[
          { label: 'AIR', o2: DEFAULT_O2, he: DEFAULT_HE },
          { label: 'EAN30', o2: 30, he: 0 },
          { label: 'EAN32', o2: 32, he: 0 },
          { label: 'EAN36', o2: 36, he: 0 },
        ]}
        activeO2={o2}
        activeHe={he}
        onSelect={(o2Preset, hePreset) => {
          setO2(o2Preset);
          setHe(hePreset);
        }}
      />

      <SwitchCard
        isTrimix={isTrimix}
        setIsTrimix={handleSetIsTrimix}
        setHe={setHeSafe}
      />

      {isTrimix && (
        <>
          <StepperInput
            label="Helium (He)"
            value={he}
            onChange={setHeSafe}
            min={0}
            max={80}
          />

          <PresetChips
            presets={[
              { label: 'Tx21/35', o2: DEFAULT_O2, he: DEFAULT_TRIMIX_HE },
              { label: 'Tx18/45', o2: 18, he: 45 },
              { label: 'Tx10/50', o2: 10, he: 50 },
            ]}
            activeO2={o2}
            activeHe={he}
            onSelect={(o2Preset, hePreset) => {
              setO2(o2Preset);
              setHe(hePreset);
            }}
          />

          {!hasError && <ENDview endMeters={endMeters} />}
        </>
      )}

      <TouchableOpacity
        onPress={() => {
          if (hasError) return;

          navigation.navigate('Label', {
            o2,
            he: effectiveHe,
            ppO2,
            modMeters: modMeters ?? undefined,
            endMeters: isTrimix ? (endMeters ?? undefined) : undefined,
          });
        }}
        disabled={hasError}
        className={`mt-6 rounded-2xl p-4 items-center ${
          hasError ? 'bg-zinc-800' : 'bg-[#0493c6]/80'
        }`}
      >
        <Text className="text-white font-semibold text-lg">View Label</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default CalculatorScreen;
