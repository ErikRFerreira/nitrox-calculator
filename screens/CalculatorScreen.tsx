import { useState } from 'react';
import { View, Text } from 'react-native';
import { calculateMOD, metersToFeet } from '../domain/gas/calculations';
import { validateMix } from '../domain/gas/validators';
import StepperInput from '../components/StepperInput';
import SegmentedToggle from '../components/SegmentedToggle';
import PresetChips from '../components/PresetChips';

function CalculatorScreen() {
  const [o2, setO2] = useState(32);
  const [he, setHe] = useState(0);
  const [ppO2, setPpO2] = useState(1.4);

  const mix = { o2, he };
  const warnings = validateMix(mix);
  const hasError = warnings.some((w) => w.type === 'error');

  const modMeters = hasError ? null : calculateMOD(mix, ppO2);
  const modFeet = modMeters === null ? null : metersToFeet(modMeters);

  const setO2Safe = (nextO2: number) => {
    setO2(nextO2);
    setHe((prevHe) => Math.max(0, Math.min(prevHe, 100 - nextO2)));
  };

  const setHeSafe = (nextHe: number) => {
    setHe(Math.max(0, Math.min(nextHe, 100 - o2)));
  };

  return (
    <View className="flex-1 bg-zinc-950 p-6">
      <Text className="text-zinc-400">MOD</Text>

      <SegmentedToggle
        options={[
          { label: 'ppO₂ 1.4', value: 1.4 },
          { label: 'ppO₂ 1.6', value: 1.6 },
        ]}
        value={ppO2}
        onChange={setPpO2}
      />

      <Text
        className={`text-6xl font-bold ${hasError ? 'text-zinc-600' : 'text-white'}`}
      >
        {modMeters !== null ? `${modMeters.toFixed(1)} m` : '--'}
      </Text>
      <Text className="text-zinc-500 mt-2">
        {modFeet !== null ? `${modFeet.toFixed(0)} ft` : ''}
      </Text>

      {ppO2 === 1.6 && (
        <View className="mt-3 bg-zinc-900 rounded-xl p-4">
          <Text className="text-zinc-300">
            Typically used for decompression or contingency.
          </Text>
        </View>
      )}

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
        label="Oxygen (O₂)"
        value={o2}
        onChange={setO2Safe}
        min={21}
        max={100}
      />

      <PresetChips
        presets={[
          { label: 'EAN32', o2: 32, he: 0 },
          { label: 'EAN36', o2: 36, he: 0 },
        ]}
        onSelect={(o2Preset, hePreset) => {
          setO2(o2Preset);
          setHe(hePreset);
        }}
      />

      <StepperInput
        label="Helium (He)"
        value={he}
        onChange={setHeSafe}
        min={0}
        max={80}
      />

      <PresetChips
        presets={[
          { label: 'Tx21/35', o2: 21, he: 35 },
          { label: 'Tx18/45', o2: 18, he: 45 },
        ]}
        onSelect={(o2Preset, hePreset) => {
          setO2(o2Preset);
          setHe(hePreset);
        }}
      />
    </View>
  );
}

export default CalculatorScreen;
