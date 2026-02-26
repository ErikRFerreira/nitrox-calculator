import { Feather } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { CalculatorStackParamList } from '../app/CalculatorStack';
import { formatDepth } from '../utils/units';
import { addHistoryEntry } from '../storage/historyStorage';
import { useSettings } from '../storage/useSettings';

type LabelRoute = RouteProp<CalculatorStackParamList, 'Label'>;
function LabelScreen() {
  const { settings } = useSettings();
  const route = useRoute<LabelRoute>();
  const { o2, he, ppO2, modMeters, endMeters } = route.params;
  const navigation = useNavigation();
  const diverName = settings.userName || 'Your Name';
  const formattedMod =
    modMeters !== undefined ? formatDepth(modMeters, settings.units) : null;
  const formattedEnd =
    endMeters !== undefined ? formatDepth(endMeters, settings.units) : null;

  // Format date as 'dd/mm/yy'
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  const formattedDate = `${day}/${month}/${year}`;

  // Format gas mix
  let mixDisplay = '';
  if (he > 0) {
    mixDisplay = `Tx${o2}/${he}`;
  } else {
    mixDisplay = `${o2}%`;
  }

  return (
    <View className="flex-1 p-6">
      <View className="mt-4 mb-6 flex-row items-center justify-between">
        {/* Left: Feather icon */}
        <View style={{ width: 40, alignItems: 'flex-start' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
        </View>
        {/* Center: Title */}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text className="text-2xl text-white font-bold">Tank Label</Text>
        </View>
        {/* Right: Empty for symmetry */}
        <View style={{ width: 40 }} />
      </View>
      <View className="mb-4">
        <Text className="text-zinc-400 text-center">
          General instructions on how to mark your tank label with the gas
          analysis results: Name, Date, Mix %, MOD, and END (if applicable).
        </Text>
      </View>
      <View className="bg-zinc-300 border border-blue-200 rounded-2xl px-6 py-7 shadow-sm">
        {/* Row 1: Name & Date */}
        <View className="flex-row justify-between items-center mb-6">
          {/* Name */}
          <View className="flex-1 mr-2">
            <Text className="text-xs text-blue-500 tracking-widest mb-1">
              NAME
            </Text>
            <Text className="text-zinc-900 text-xl font-bold">{diverName}</Text>
          </View>
          {/* Date */}
          <View className="flex-1 ml-2 items-end">
            <Text className="text-xs text-blue-500 tracking-widest mb-1">
              DATE
            </Text>
            <Text className="text-zinc-900 text-xl font-bold">
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Row 2: % Mix & MOD */}
        <View className="flex-row justify-between items-center mb-6">
          {/* % Mix or Trimix */}
          <View className="flex-1 mr-2">
            <Text className="text-xs text-blue-500 tracking-widest mb-1">
              MIX %
            </Text>
            <Text className="text-xl font-extrabold text-zinc-900">
              {mixDisplay}
            </Text>
          </View>
          {/* MOD */}
          <View className="flex-1 ml-2 items-end">
            <Text className="text-xs text-blue-500 tracking-widest mb-1">
              MOD
            </Text>
            <Text className="text-zinc-900 text-xl font-extrabold">
              {formattedMod?.primary ?? '--'}
            </Text>
            <Text className="text-xs text-zinc-500">
              {formattedMod?.secondary}
            </Text>
          </View>
        </View>

        {/* Row 3: END (if present) */}
        {endMeters !== undefined && (
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-1 mr-2">
              <Text className="text-xs text-blue-500 tracking-widest mb-1">
                END
              </Text>
              <Text className="text-zinc-900 text-xl font-extrabold">
                {formattedEnd?.primary ?? '--'}
              </Text>
              <Text className="text-xs text-zinc-500">
                {formattedEnd?.secondary}
              </Text>
            </View>
            <View className="flex-1 ml-2" />
          </View>
        )}
      </View>

      <View className="mt-6 w-full flex-row items-center justify-center rounded-full border border-amber-600/35 bg-amber-950/30 px-4 py-3">
        <Text className="text-sm leading-6 font-semibold uppercase tracking-wide text-amber-500 text-center">
          ! Always verify your gas content with an analyzer before diving
        </Text>
      </View>

      <TouchableOpacity
        onPress={async () => {
          const entry = {
            id: String(Date.now()),
            createdAtMs: Date.now(),
            diverName,
            o2,
            he,
            ppO2,
            modMeters,
            endMeters,
          };

          await addHistoryEntry(entry);

          navigation.navigate('History' as never);
        }}
        className="bg-[#0493c6]/80 mt-6 rounded-2xl p-4 items-center"
      >
        <Text className="text-white font-semibold text-lg">
          Save to History
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LabelScreen;
