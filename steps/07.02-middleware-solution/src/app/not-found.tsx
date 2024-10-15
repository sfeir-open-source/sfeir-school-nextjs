'use client';

import { usePathname } from 'next/navigation';

import PageError from '@/components/PageError';

const NotFoundError = () => {
  const pathname = usePathname();
  return <PageError code={404}>Oops, the page "{pathname}" does not exist</PageError>;
};

export default NotFoundError;
