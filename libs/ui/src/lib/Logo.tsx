'use client';

import Image from 'next/image';
import { memo } from 'react';
import { logoLight } from '../index';

type LogoProps = {
  className?: string;
};

export const Logo = memo(({ className = '' }: LogoProps) => {
  return <Image src={logoLight} alt="People logo" className={className} />;
});
