import { Text, View } from 'react-native';

import { LearnCategory } from './learnTypes';

type LearnCategoryHeaderProps = {
  category: LearnCategory;
};

function LearnCategoryHeader({ category }: LearnCategoryHeaderProps) {
  return (
    <View className="mb-4 mt-2">
      <Text className="text-xs font-bold uppercase tracking-widest text-cyan-300">
        {category.title}
      </Text>
      <Text className="mt-2 leading-6 text-zinc-300">{category.description}</Text>
    </View>
  );
}

export default LearnCategoryHeader;
