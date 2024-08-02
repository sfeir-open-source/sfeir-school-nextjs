import clsx from 'clsx';

export type ButtonProps<C extends React.ElementType> = {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  component?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, 'className' | 'variant'>;

const classNames = {
  primary: 'inline-block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5',
  secondary:
    'inline-block py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
};

const Button = <C extends React.ElementType = 'button'>({
  children,
  className,
  variant = 'secondary',
  component,
  ...restProps
}: ButtonProps<C>) => {
  const Component = component || 'button';
  return (
    <Component {...restProps} className={clsx(className, classNames[variant])}>
      {children}
    </Component>
  );
};

export default Button;
