'use client';

import { cn, debounce } from '@sfeir/helpers';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, memo, useMemo } from 'react';
import { TextField } from './TextField';

type SearchProps = {
  className?: string;
};

export const Search = memo(({ className }: SearchProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const params = new URLSearchParams(searchParams);
        if (!value) {
          params.delete('search');
        } else {
          params.set('search', value);
        }
        router.replace(`${pathname}?${params.toString()}`);
      }, 500),
    [pathname, router, searchParams],
  );

  return (
    <TextField
      id="search"
      label="Search"
      placeholder="Search"
      type="search"
      className={cn('w-full mb-4', className)}
      onChange={handleSearch}
      defaultValue={search}
    />
  );
});
