import NavigationMenu from '@/components/NavigationMenu';
import Link from 'next/link';

import logo from '@/assets/svg/logo.svg';
import Image from 'next/image';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <header className="sidebar">
        <Link href="/">
          <Image src={logo} alt="People logo" className="sidebar__icon" />
        </Link>
        <NavigationMenu />
      </header>
      <main className="dashboard-main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
