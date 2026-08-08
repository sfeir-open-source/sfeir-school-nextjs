'use client';

import { memo, ReactNode } from 'react';

type NoSSRProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export const NoSSR = memo(({ children }: NoSSRProps) => {
  return children;
});
