'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

type PaginationProps = {
  totalPages: number;
  className?: string;
};

type PaginationShortcutProps = {
  href: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
};

const PaginationShortcut: React.FC<PaginationShortcutProps> = ({ href, disabled, className, children }) => {
  const classNames = clsx(
    'block text-center px-3 py-2 ms-0 border bg-white',
    className,
    !disabled && 'hover:bg-gray-100 hover:text-gray-700 text-gray-500 border-gray-300 ',
    disabled && 'text-gray-300 border-gray-200'
  );

  if (disabled) return <div className={classNames}>{children}</div>;

  return (
    <Link href={href} replace className={classNames}>
      {children}
    </Link>
  );
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, className }) => {
  const params = useSearchParams();
  const pathname = usePathname();

  const currentPage = Number(params.get('page')) || 1;

  const getPageUrl = (page: number): string => {
    const newParams = new URLSearchParams(params);
    newParams.set('page', page.toString());
    return `${pathname}?${newParams.toString()}`;
  };

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <PaginationShortcut
            href={getPageUrl(currentPage - 1)}
            disabled={currentPage - 1 < 1}
            className="rounded-s-lg"
          >
            Previous
          </PaginationShortcut>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => {
          const isActive = currentPage === index + 1;
          return (
            <li key={index} aria-current={isActive ? 'page' : undefined}>
              <Link
                href={getPageUrl(index + 1)}
                replace
                className={clsx(
                  'block text-center px-3 py-2 ms-0 border border-gray-300',
                  isActive && 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700',
                  !isActive && 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'
                )}
              >
                {index + 1}
              </Link>
            </li>
          );
        })}
        <li>
          <PaginationShortcut
            href={getPageUrl(currentPage + 1)}
            disabled={currentPage + 1 > totalPages}
            className="rounded-e-lg"
          >
            Next
          </PaginationShortcut>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
