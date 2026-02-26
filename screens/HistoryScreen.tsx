import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useMemo, useState } from 'react';
import { Alert, SectionList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { deleteHistoryEntry, getHistory } from '../storage/historyStorage';
import { HistoryEntry } from '../storage/types';

type FilterType = 'all' | 'nitrox' | 'trimix';

type HistorySection = {
  title: string;
  data: HistoryEntry[];
};

const SECTION_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function getDateKey(timestamp: number): string {
  const date = new Date(timestamp);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function getSectionTitle(timestamp: number): string {
  const now = new Date();
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();

  const date = new Date(timestamp);
  const targetStart = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();

  const dayDiff = Math.round((todayStart - targetStart) / 86400000);

  if (dayDiff === 0) return 'Today';
  if (dayDiff === 1) return 'Yesterday';
  return SECTION_DATE_FORMATTER.format(date);
}

function getMixTitle(entry: HistoryEntry): string {
  return entry.he > 0 ? `Trimix ${entry.o2}/${entry.he}` : `Nitrox ${entry.o2}`;
}

function HistoryScreen() {
  const [entries, setEntries] = useState<HistoryEntry[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        const data = await getHistory();
        setEntries(data);
      };
      load();
    }, []),
  );

  const reloadEntries = async () => {
    const data = await getHistory();
    setEntries(data);
  };

  const deleteEntry = async (id: string): Promise<void> => {
    await deleteHistoryEntry(id);
    await reloadEntries();
  };

  const confirmDelete = (entry: HistoryEntry) => {
    Alert.alert(
      'Delete entry?',
      'Are you sure you want to delete this entry from history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            void deleteEntry(entry.id);
          },
        },
      ],
    );
  };

  const filteredEntries = useMemo(() => {
    if (filter === 'all') return entries;
    if (filter === 'nitrox') return entries.filter((entry) => entry.he === 0);
    return entries.filter((entry) => entry.he > 0);
  }, [entries, filter]);

  const sections = useMemo<HistorySection[]>(() => {
    const grouped = new Map<string, HistorySection>();

    filteredEntries.forEach((entry) => {
      const key = getDateKey(entry.createdAtMs);
      const existing = grouped.get(key);

      if (existing) {
        existing.data.push(entry);
        return;
      }

      grouped.set(key, {
        title: getSectionTitle(entry.createdAtMs),
        data: [entry],
      });
    });

    return Array.from(grouped.values());
  }, [filteredEntries]);

  const emptyMessage =
    filter === 'all'
      ? 'No history entries yet.'
      : filter === 'nitrox'
        ? 'No Nitrox entries yet.'
        : 'No Trimix entries yet.';

  const renderFilterTab = (label: string, value: FilterType) => {
    const isActive = filter === value;

    return (
      <TouchableOpacity
        key={value}
        onPress={() => setFilter(value)}
        className={`mr-8 border-b-[3px] pb-3 pt-2 ${isActive ? 'border-cyan-400' : 'border-transparent'}`}
      >
        <Text
          className={`text-lg font-semibold ${isActive ? 'text-cyan-400' : 'text-zinc-400'}`}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-zinc-950 px-4 pb-4 pt-10">
      <Text className="text-center text-2xl font-bold text-white">History</Text>

      <View className="mt-4 flex-row border-b border-[#0f2940]">
        {renderFilterTab('All', 'all')}
        {renderFilterTab('Nitrox', 'nitrox')}
        {renderFilterTab('Trimix', 'trimix')}
      </View>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View className="mt-12 items-center px-6">
            <Text className="text-center text-zinc-400">{emptyMessage}</Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <Text className="pb-2 pt-6 text-xs font-bold uppercase tracking-[2px] text-zinc-500">
            {section.title}
          </Text>
        )}
        renderItem={({ item }) => {
          const isTrimix = item.he > 0;
          const mixTypeLabel = isTrimix ? 'TRIMIX' : 'NITROX';
          const borderColor = isTrimix
            ? 'border-l-[#4f46e5]'
            : 'border-l-[#22d3ee]';
          const badgeContainerStyle = isTrimix
            ? 'bg-indigo-500/10 border-indigo-500/30'
            : 'bg-cyan-500/10 border-cyan-500/30';
          const badgeTextStyle = isTrimix ? 'text-indigo-300' : 'text-cyan-300';

          return (
            <View
              className={`mb-3 rounded-2xl border border-[#0f2940] bg-zinc-900/80 p-4 ${borderColor} border-l-2`}
            >
              <View className="flex-row items-start justify-between">
                <View className="flex-1 flex-row gap-3 pr-3 items-center">
                  <Text className="text-xl font-semibold text-slate-100">
                    {getMixTitle(item)}
                  </Text>
                  <View
                    className={`self-start rounded-full border px-2 py-1 ${badgeContainerStyle}`}
                  >
                    <Text
                      className={`text-[10px] font-semibold ${badgeTextStyle}`}
                    >
                      {mixTypeLabel}
                    </Text>
                  </View>
                </View>

                <View className="items-end">
                  <Text className="text-xl text-zinc-400">
                    {TIME_FORMATTER.format(new Date(item.createdAtMs))}
                  </Text>
                </View>
              </View>

              <View className="my-4 h-px bg-[#0f2940]" />

              <View className="flex-row items-center justify-between">
                <View>
                  <View className="flex flex-row gap-2 items-end">
                    <Text className="text-ms text-zinc-300">MOD Result</Text>
                    <Text className="text-xs uppercase text-zinc-500">
                      ({(item.ppO2 ?? 1.4).toFixed(1)} PPO2)
                    </Text>
                  </View>
                  <View className="mt-2 flex-row items-baseline">
                    <Text className="text-3xl font-bold text-cyan-400">
                      {item.modMeters?.toFixed(1) ?? '--'}
                    </Text>
                    <Text className="mb-1 ml-1 text-xl text-zinc-400">m</Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => confirmDelete(item)}
                    className="mt-2 p-2"
                  >
                    <Feather name="trash-2" size={24} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

export default HistoryScreen;
