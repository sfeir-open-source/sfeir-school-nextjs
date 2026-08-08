import clsx from 'clsx';

type AlertProps = {
  children: React.ReactNode;
  className?: string;
};

export const Alert = ({ children, className }: AlertProps) => (
  <div className={clsx('p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400', className)} role="alert">
    {children}
  </div>
);
