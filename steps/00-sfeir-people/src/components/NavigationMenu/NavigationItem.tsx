'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavigationItem.module.css';
import clsx from 'clsx';

type NavigationItemsProps = {
  href: string;
  children: React.ReactNode;
};

const NavigationItem: React.FC<NavigationItemsProps> = ({ href, children }) => {
  const pathname = usePathname();

  return (
    <Link href={href} className={clsx('menu__item', pathname === href && 'menu__item-active')}>
      {children}
    </Link>
  );
};

export default NavigationItem;
