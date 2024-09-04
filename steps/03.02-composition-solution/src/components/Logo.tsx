'use client';

import { useContext } from 'react';

import { ThemeContext } from './ThemeProvider';
import Image from 'next/image';

import logo from '@/assets/svg/logo.svg';
import logoDark from '@/assets/svg/logoDark.svg';

const Logo = () => {
  const theme = useContext(ThemeContext);

  return <Image src={theme === 'dark' ? logoDark : logo} alt="People logo" className="h-10 w-auto mb-5 pl-4" />;
};

export default Logo;
