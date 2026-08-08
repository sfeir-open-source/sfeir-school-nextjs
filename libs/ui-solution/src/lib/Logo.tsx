'use client';

import Image from 'next/image';
import { memo, use } from 'react';
import { logoDark, logoLight } from '../index';
import { ThemeContext } from './Theme';

type LogoProps = {
  className?: string;
};

export const Logo = memo(({ className = '' }: LogoProps) => {
  const theme = use(ThemeContext);
  return <Image src={theme === 'dark' ? logoDark : logoLight} alt="People logo" className={className} />;
});
