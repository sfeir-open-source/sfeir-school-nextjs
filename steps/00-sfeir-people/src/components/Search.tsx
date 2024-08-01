'use client';

import { debounce } from '@/functions/timing';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const Search = ({ ...restProps }) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const handleChange = debounce((event) => {
    const value = event.target?.value;
    const newParams = new URLSearchParams(params);
    if (value) newParams.set('search', value);
    else newParams.delete('search');
    router.replace(`${pathname}?${newParams.toString()}`);
  }, 200);

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search input
      </label>
      <input
        id="search"
        type="text"
        onChange={handleChange}
        defaultValue={params.get('search')?.toString() || ''}
        placeholder="Search"
        {...restProps}
        className={clsx(
          restProps?.className,
          'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5'
        )}
      />
    </>
  );
};

export default Search;
