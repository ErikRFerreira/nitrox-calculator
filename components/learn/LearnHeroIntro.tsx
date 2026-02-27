import { Text, View } from 'react-native';

type LearnHeroIntroProps = {
  title: string;
  description: string;
};

function LearnHeroIntro({ title, description }: LearnHeroIntroProps) {
  return (
    <View className="mb-6">
      <Text className="text-4xl font-bold leading-tight tracking-tight text-white">
        {title}
      </Text>
      <Text className="mt-3 text-lg leading-7 text-zinc-300">{description}</Text>
    </View>
  );
}

export default LearnHeroIntro;
