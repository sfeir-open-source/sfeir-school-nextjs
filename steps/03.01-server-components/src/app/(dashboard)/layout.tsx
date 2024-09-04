import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

import NavigationMenu from '@/components/NavigationMenu';

import logo from '@/assets/svg/logo.svg';

type DashboardLayoutProps = { children: React.ReactNode };

export const metadata: Metadata = {
  title: 'SFEIR People | Dashboard',
};

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({ children }) => {
  return (
    <div className="flex bg-blue-50 dark:bg-slate-950 dark:text-white">
      <header className="p-4 min-h-screen	min-w-64 bg-white flex flex-col sticky left-0 top-0 h-screen dark:bg-slate-900">
        <Link href="/">
          <Image src={logo} alt="People logo" className="h-10 w-auto mb-5 pl-4" />
        </Link>
        <NavigationMenu />
        <div className="mt-auto">Version: ?.?.?</div>
      </header>
      <main className="w-full p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
