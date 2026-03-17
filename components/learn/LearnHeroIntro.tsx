import { Text, View } from 'react-native';

type LearnHeroIntroProps = {
  title: string;
};

function LearnHeroIntro({ title }: LearnHeroIntroProps) {
  return (
    <View className="mb-6">
      <Text className="text-4xl font-bold leading-tight tracking-tight text-white">
        {title}
      </Text>
    </View>
  );
}

export default LearnHeroIntro;
