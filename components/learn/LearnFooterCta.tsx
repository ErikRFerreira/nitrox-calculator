import { Text } from 'react-native';

type LearnFooterCtaProps = {
  disclaimer: string;
};

function LearnFooterCta({ disclaimer }: LearnFooterCtaProps) {
  return (
    <>
      <Text className="mt-4 text-center text-xs text-zinc-500">
        {disclaimer}
      </Text>
    </>
  );
}

export default LearnFooterCta;
