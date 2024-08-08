import NavigationMenu from '@/components/NavigationMenu';
import Link from 'next/link';

import logo from '@/assets/svg/logo.svg';
import Image from 'next/image';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children, modal }) => {
  return (
    <div className="flex bg-blue-50">
      <header className="p-4 min-h-screen	min-w-64 bg-white">
        <Link href="/">
          <Image src={logo} alt="People logo" className="h-10 w-auto mb-5 pl-4" />
        </Link>
        <NavigationMenu />
      </header>
      <main className="w-full p-4">{children}</main>
      {modal}
    </div>
  );
};

export default DashboardLayout;
