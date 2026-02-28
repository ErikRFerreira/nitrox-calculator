import { Image, ImageSourcePropType, Text, View } from 'react-native';

import { LearnArticle, LearnBlock } from './learnTypes';

type LearnArticleCardProps = {
  article: LearnArticle;
};

const IMAGE_ASSETS: Record<string, ImageSourcePropType> = {
  'learn_daltons_triangle.png': require('../../assets/learn_daltons_triangle.png'),
  'learn_ventid.png': require('../../assets/learn_ventid.png'),
};

function renderBlock(articleId: string, block: LearnBlock, index: number) {
  const key = `${articleId}-${index}`;

  if (block.type === 'formula') {
    return (
      <View
        key={key}
        className="mb-3 rounded-xl border border-cyan-400/20 bg-zinc-950 p-4"
      >
        <Text className="font-mono text-sm text-cyan-300">{block.content}</Text>
      </View>
    );
  }

  if (block.type === 'warning') {
    return (
      <View
        key={key}
        className="mb-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4"
      >
        <Text className="font-medium text-yellow-300">{block.content}</Text>
      </View>
    );
  }

  if (block.type === 'checklist') {
    return (
      <View
        key={key}
        className="mb-3 rounded-xl border border-zinc-700 bg-zinc-900/60 p-4"
      >
        <Text className="mb-2 text-sm font-bold text-white">{block.title}</Text>
        {block.items.map((item, itemIndex) => (
          <Text
            key={`${key}-item-${itemIndex}`}
            className="mb-1 leading-6 text-zinc-200"
          >
            {'\u2022'} {item}
          </Text>
        ))}
      </View>
    );
  }

  if (block.type === 'image') {
    const imageSource = IMAGE_ASSETS[block.asset];

    return (
      <View
        key={key}
        className="mb-3 rounded-xl border border-zinc-700 bg-zinc-900/60 p-4"
      >
        {imageSource ? (
          <Image
            source={imageSource}
            accessibilityLabel={block.caption}
            resizeMode="contain"
            style={{ width: '100%', height: 220, borderRadius: 12 }}
          />
        ) : (
          <Text className="text-xs uppercase tracking-widest text-zinc-500">
            Missing image asset: {block.asset}
          </Text>
        )}
        <Text className="mt-2 leading-6 text-zinc-200">{block.caption}</Text>
      </View>
    );
  }

  return (
    <Text key={key} className="mb-3 leading-6 text-zinc-200">
      {block.content}
    </Text>
  );
}

function LearnArticleCard({ article }: LearnArticleCardProps) {
  return (
    <View className="mb-5 rounded-2xl border border-zinc-800 bg-[#1a252e] p-5">
      <Text className="mb-4 text-xl font-bold text-white">{article.title}</Text>
      {article.blocks.map((block, index) =>
        renderBlock(article.id, block, index),
      )}
    </View>
  );
}

export default LearnArticleCard;
