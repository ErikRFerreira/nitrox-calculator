import React from 'react';
import renderer, { act } from 'react-test-renderer';
import MODview from '../components/MODview';
import { getSettings } from '../storage/settingsStorage';

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('../storage/settingsStorage', () => ({
  getSettings: jest.fn(),
}));

const mockedGetSettings = getSettings as jest.MockedFunction<typeof getSettings>;

function collectText(node: renderer.ReactTestRendererJSON | null): string {
  if (!node) return '';

  const walk = (current: renderer.ReactTestRendererJSON | string): string[] => {
    if (typeof current === 'string') return [current];
    const children = current.children ?? [];
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

  test('shows metric primary and imperial secondary when settings units are metric', async () => {
    mockedGetSettings.mockResolvedValue({ units: 'metric', userName: '' });

    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(
        <MODview modMeters={10} hasError={false} ppO2={1.4} />,
      );
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as renderer.ReactTestRendererJSON);
    expect(text).toContain('10.0');
    expect(text).toContain('m');
    expect(text).toContain('33 ft');
  });

  test('shows imperial primary and metric secondary when settings units are imperial', async () => {
    mockedGetSettings.mockResolvedValue({ units: 'imperial', userName: '' });

    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(
        <MODview modMeters={10} hasError={false} ppO2={1.4} />,
      );
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as renderer.ReactTestRendererJSON);
    expect(text).toContain('33');
    expect(text).toContain('ft');
    expect(text).toContain('10.0 m');
  });

  test('shows placeholder and no secondary depth when mod is null', async () => {
    mockedGetSettings.mockResolvedValue({ units: 'imperial', userName: '' });

    let tree: renderer.ReactTestRenderer | null = null;
    await act(async () => {
      tree = renderer.create(
        <MODview modMeters={null} hasError={false} ppO2={1.4} />,
      );
      await Promise.resolve();
    });

    const text = collectText(tree!.toJSON() as renderer.ReactTestRendererJSON);
    expect(text).toContain('--');
    expect(text).not.toContain('33 ft');
    expect(text).not.toContain('10.0 m');
  });
});
