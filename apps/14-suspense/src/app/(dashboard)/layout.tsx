import { Metadata } from 'next';
import Link from 'next/link';

import { Button, NavigationMenu } from '@sfeir/ui/server';

import { Logo, Theme } from '@sfeir/ui';
import { ReactNode } from 'react';

import { logout } from '../(auth)/action';

type DashboardLayoutProps = { children: ReactNode };

export const metadata: Metadata = {
  title: 'SFEIR People | Dashboard',
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  return (
    <Theme>
      <div className="flex bg-blue-50 dark:bg-slate-950 dark:text-white">
        <header className="p-4 min-h-screen	min-w-64 bg-white flex flex-col sticky left-0 top-0 h-screen dark:bg-slate-900">
          <Link href="/">
            <Logo className="h-10 w-auto mb-5 pl-4" />
          </Link>
          <NavigationMenu />
          <form action={logout} className="mt-auto">
            <Button type="submit" className="w-full">
              Logout
            </Button>
          </form>
        </header>
        <main className="w-full p-4">{children}</main>
      </div>
    </Theme>
  );
};

export default DashboardLayout;
