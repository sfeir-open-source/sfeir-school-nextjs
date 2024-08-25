'use client';

import logoLight from '@/assets/svg/logo.svg';
import logoDark from '@/assets/svg/logoDark.svg';

import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const Logo = () => {
  const theme = useContext(ThemeContext);
  return <Image src={theme === 'light' ? logoLight : logoDark} alt="People logo" className="h-10 w-auto mb-5 pl-4" />;
};

export default Logo;
