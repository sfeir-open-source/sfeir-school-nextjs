'use client';

import { memo } from 'react';
import { TextField } from './TextField';
import { cn } from '@sfeir/helpers';

type SearchProps = {
  className?: string;
};

export const Search = memo(({ className }: SearchProps) => {
  return <TextField id="search" label="Search" placeholder="Search" type="search" className={cn('w-full mb-4', className)} />;
});
