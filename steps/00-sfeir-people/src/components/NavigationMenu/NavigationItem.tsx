'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import clsx from 'clsx';

type NavigationItemsProps = {
  href: string;
  children: React.ReactNode;
};

const NavigationItem: React.FC<NavigationItemsProps> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={clsx('block px-4 py-2 rounded-md', pathname === href && 'bg-blue-50')}>
      {children}
    </Link>
  );
};

export default NavigationItem;
