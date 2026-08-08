'use client';

import { memo, ReactNode, useEffect, useState } from 'react';

type NoSSRProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export const NoSSR = memo(({ children, fallback }: NoSSRProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? children : (fallback ?? null);
});
