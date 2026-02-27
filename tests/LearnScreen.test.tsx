import React from 'react';
import renderer, {
  act,
  ReactTestRenderer,
  ReactTestRendererJSON,
} from 'react-test-renderer';

import LearnScreen from '../screens/LearnScreen';

jest.mock('@expo/vector-icons', () => ({
  Feather: 'Feather',
}));

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: 'SafeAreaView',
}));

function collectText(node: ReactTestRendererJSON | null): string {
  if (!node) return '';

  const walk = (current: ReactTestRendererJSON | string): string[] => {
    if (typeof current === 'string') return [current];
    const children = (current.children ?? []) as Array<
      ReactTestRendererJSON | string
    >;
    return children.flatMap((child) =>
      typeof child === 'string' ? [child] : walk(child),
    );
  };

  return walk(node).join(' ');
}

describe('LearnScreen', () => {
  test('renders static header and JSON-driven category/article content', async () => {
    let tree: ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(<LearnScreen />);
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as ReactTestRendererJSON);
    expect(text).toContain('Learn');
    expect(text).toContain('Nitrox Knowledge Base');
    expect(text).toContain('Gas Fundamentals');
    expect(text).toContain('Why use Nitrox?');
    expect(text).toContain('This content is educational reinforcement');
  });

  test('renders all block types expanded by default with no details button', async () => {
    let tree: ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(<LearnScreen />);
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as ReactTestRendererJSON);
    expect(text).toContain('P_total = P_O2 + P_N2 + P_He');
    expect(text).toContain('Nitrox does not make you "immune"');
    expect(text).toContain('Practical takeaways');
    expect(text).toContain('Use Nitrox to manage nitrogen exposure');
    expect(text).toContain('Conceptual comparison: reduced nitrogen exposure');
    expect(text).not.toContain('Details');
    expect(text).not.toContain('Show more');
    expect(text).not.toContain('Hide');
    expect(() => tree!.root.findByProps({ testID: 'learn-details-ppo2' })).toThrow();
  });
});
