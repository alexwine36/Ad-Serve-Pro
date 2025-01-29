'use client';
import type React from 'react';
import type { ReactNode } from 'react';
import { DesignSystemProvider } from '../../../../packages/design-system';
import { trpc } from '../../utils/trpc';

type ProvidersProps = {
  readonly children: ReactNode;
};

const ProviderWrappers: React.FC<ProvidersProps> = ({ children }) => {
  return <DesignSystemProvider>{children}</DesignSystemProvider>;
};

// biome-ignore lint/suspicious/noExplicitAny: Issue with Intrinsic Props
export const Providers: any = trpc.withTRPC(ProviderWrappers);
