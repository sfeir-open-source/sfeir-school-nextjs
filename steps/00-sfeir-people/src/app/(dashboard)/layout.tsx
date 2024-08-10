import Image from 'next/image';
import Link from 'next/link';

import { promises as fs } from 'fs';
import path from 'path';

import NavigationMenu from '@/components/NavigationMenu';
import logo from '@/assets/svg/logo.svg';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonContent);

  return (
    <div className="flex bg-blue-50">
      <header className="p-4 min-h-screen	min-w-64 bg-white flex flex-col">
        <Link href="/">
          <Image src={logo} alt="People logo" className="h-10 w-auto mb-5 pl-4" />
        </Link>
        <NavigationMenu />
        <div className="mt-auto">Version: {packageJson.version}</div>
      </header>
      <main className="w-full p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
