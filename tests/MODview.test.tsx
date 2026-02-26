import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MODview from '../components/MODview';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

function collectText(node: renderer.ReactTestRendererJSON | null): string {
  if (!node) return '';

  const walk = (current: renderer.ReactTestRendererJSON | string): string[] => {
    if (typeof current === 'string') return [current];
    const children = (current.children ?? []) as Array<
      renderer.ReactTestRendererJSON | string
    >;
    return children.flatMap((child) =>
      typeof child === 'string' ? [child] : walk(child),
    );
  };

  return walk(node).join(' ');
}

describe('MODview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows metric primary and imperial secondary when units are metric', async () => {
    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(
        <MODview modMeters={10} hasError={false} ppO2={1.4} units="metric" />,
      );
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as renderer.ReactTestRendererJSON);
    expect(text).toContain('10.0');
    expect(text).toContain('m');
    expect(text).toContain('33 ft');
  });

  test('shows imperial primary and metric secondary when units are imperial', async () => {
    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(
        <MODview
          modMeters={10}
          hasError={false}
          ppO2={1.4}
          units="imperial"
        />,
      );
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as renderer.ReactTestRendererJSON);
    expect(text).toContain('33');
    expect(text).toContain('ft');
    expect(text).toContain('10.0 m');
  });

  test('shows placeholder and no secondary depth when mod is null', async () => {
    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(
        <MODview
          modMeters={null}
          hasError={false}
          ppO2={1.4}
          units="imperial"
        />,
      );
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as renderer.ReactTestRendererJSON);
    expect(text).toContain('--');
    expect(text).not.toContain('33 ft');
    expect(text).not.toContain('10.0 m');
  });
});
