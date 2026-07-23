'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, ReactNode } from 'react';

interface NavigationItemProps {
  href: string;
  children: ReactNode;
}

export const NavigationItem = memo(({ href, children }: NavigationItemProps) => {
  const pathname = usePathname();

  const isActive = (href !== '/' && pathname.includes(href)) || (href === '/' && pathname === href);
  return (
    <li>
      <Link href={href} className={clsx('block px-4 py-2 rounded-md', isActive && 'bg-gray-100')}>
        {children}
      </Link>
    </li>
  );
});
