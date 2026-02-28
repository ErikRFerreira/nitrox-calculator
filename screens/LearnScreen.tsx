import { useMemo, useState } from 'react';
import {
  DimensionValue,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import LearnArticleCard from '../components/learn/LearnArticleCard';
import LearnCategoryHeader from '../components/learn/LearnCategoryHeader';
import { parseLearnContent } from '../components/learn/learnContent';
import LearnFooterCta from '../components/learn/LearnFooterCta';
import LearnHeroIntro from '../components/learn/LearnHeroIntro';
import LearnTopBar from '../components/learn/LearnTopBar';
import learnContent from '../content/learn.json';
import { calculateScrollProgress } from '../utils/scrollProgress';

const content = parseLearnContent(learnContent);
const NAV_TITLE = 'Learn';
const HERO_TITLE = 'Nitrox Knowledge Base';
const HERO_DESCRIPTION =
  'Key gas planning concepts and operational practices, organized for fast review before or after dives.';

function LearnScreen() {
  const [scrollY, setScrollY] = useState(0);
  const [contentHeight, setContentHeight] = useState(1);
  const [viewportHeight, setViewportHeight] = useState(1);

  const progress = useMemo(
    () => calculateScrollProgress(scrollY, contentHeight, viewportHeight),
    [scrollY, contentHeight, viewportHeight],
  );

  const progressWidth = `${(progress * 100).toFixed(1)}%` as DimensionValue;

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <LearnTopBar navTitle={NAV_TITLE} progressWidth={progressWidth} />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 20,
          paddingBottom: 60,
        }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onLayout={(event) => setViewportHeight(event.nativeEvent.layout.height)}
        onContentSizeChange={(_, height) => setContentHeight(height)}
      >
        <LearnHeroIntro title={HERO_TITLE} description={HERO_DESCRIPTION} />

        {content.categories.map((category) => (
          <View key={category.id}>
            <LearnCategoryHeader category={category} />
            {category.articles.map((article) => (
              <LearnArticleCard key={article.id} article={article} />
            ))}
          </View>
        ))}

        <LearnFooterCta disclaimer={content.footer.disclaimer} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default LearnScreen;
