import clsx from 'clsx';

import Loader from '@/components/Icons/Loader';

export type ButtonProps<C extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  component?: C;
  loading?: boolean;
} & Omit<React.ComponentPropsWithoutRef<C>, 'className' | 'variant'>;

const classNames = {
  primary: 'inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5',
  secondary: [
    'inline-block py-2.5 px-5 text-sm font-medium text-slate-900 bg-white rounded-lg border border-gray-200',
    'hover:bg-gray-100 hover:text-blue-700',
    'dark:bg-slate-900 dark:text-white dark:hover:bg-slate-950 dark:hover:text-blue-200 dark:hover:border-blue-200',
  ].join(' '),
};

const Button = <C extends React.ElementType = 'button'>({
  children,
  className,
  variant = 'secondary',
  component,
  loading,
  ...restProps
}: ButtonProps<C>) => {
  const Component = component || 'button';
  return (
    <Component {...restProps} className={clsx(className, classNames[variant])}>
      {children}
      {loading && <Loader className="inline w-4 h-4 ml-2 text-white animate-spin" />}
    </Component>
  );
};

export default Button;
