'use client';

import { memo, ReactNode } from 'react';

type ThemeProps = {
  children: ReactNode;
};

export const Theme = memo(({ children }: ThemeProps) => {
  return <section>{children}</section>;
});
