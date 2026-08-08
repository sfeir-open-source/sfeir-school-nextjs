import clsx from 'clsx';
import { HTMLAttributes } from 'react';

type PaperProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  rounded?: boolean;
};

export const Paper = ({ children, rounded = true, ...restProps }: PaperProps) => (
  <div className={clsx('bg-white dark:bg-slate-900 overflow-hidden', rounded && 'rounded-lg', restProps?.className)}>{children}</div>
);
