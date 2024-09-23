import Link from 'next/link';

import ArrowLeft from './Icons/ArrowLeft';

type PageTitleProps = {
  children: React.ReactNode;
  backHref?: string;
};

const PageTitle: React.FC<PageTitleProps> = ({ children, backHref }) => (
  <div className="flex items-center gap-1 mb-4">
    {backHref && (
      <Link
        href={backHref}
        className="text-white font-medium  block p-2.5 text-center items-center me-2 hover:bg-blue-100 rounded-full dark:hover:bg-blue-900"
      >
        <ArrowLeft className="w-6 h-6 text-slate-800 dark:text-gray-200" />
        <span className="sr-only">Go back</span>
      </Link>
    )}
    <h1 className="text-2xl font-bold">{children}</h1>
  </div>
);

export default PageTitle;
