'use client';

import { createContext, memo, ReactNode, useSyncExternalStore } from 'react';

type ThemeContext = 'dark' | 'light';

const subscribeThemeChange = (callback: (event: MediaQueryListEvent) => void) => {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', callback);
  return () => {
    window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', callback);
  };
};

const useTheme = () => {
  return useSyncExternalStore(
    subscribeThemeChange,
    () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    () => 'light',
  ) satisfies ThemeContext;
};

export const ThemeContext = createContext<ThemeContext>('light');

type ThemeProps = {
  children: ReactNode;
};

export const Theme = memo(({ children }: ThemeProps) => {
  const theme = useTheme();
  return <ThemeContext value={theme}>{children}</ThemeContext>;
});
