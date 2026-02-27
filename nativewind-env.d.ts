/// <reference types="nativewind/types" />

declare module 'react-test-renderer' {
  import * as React from 'react';

  export type ReactTestRendererNode = ReactTestRendererJSON | string;

  export interface ReactTestRendererJSON {
    type: string;
    props: Record<string, unknown>;
    children: ReactTestRendererNode[] | null;
  }

  export interface ReactTestRenderer {
    toJSON(): ReactTestRendererJSON | ReactTestRendererJSON[] | null;
    update(nextElement: React.ReactElement): void;
    unmount(): void;
    root: {
      findByProps(
        props: Record<string, unknown>,
      ): { props: Record<string, any> };
    };
  }

  export function create(element: React.ReactElement): ReactTestRenderer;

  export function act(
    callback: () => void | Promise<void>,
  ): Promise<void> | void;

  const renderer: {
    create: typeof create;
    act: typeof act;
  };

  export default renderer;
}
