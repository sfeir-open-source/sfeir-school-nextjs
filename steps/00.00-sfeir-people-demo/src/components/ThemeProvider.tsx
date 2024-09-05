'use client';

import React, { createContext, useState, useEffect } from 'react';

type ThemeValue = 'light' | 'dark';

export const ThemeContext = createContext<ThemeValue | null>(null);

type ThemeProviderProps = {
  children: React.ReactNode;
  initialValue?: ThemeValue;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeValue | null>(null);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
  }, []);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};
