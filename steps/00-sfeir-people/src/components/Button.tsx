import clsx from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
  variant: 'primary' | 'secondary';
};

const classNames = {
  primary: 'text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5',
  secondary:
    'py-2.5 px-5 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700',
};

const Button: React.FC<ButtonProps> = ({ children, className, variant = 'secondary', ...restProps }) => {
  return (
    <button {...restProps} className={clsx(className, classNames[variant])}>
      {children}
    </button>
  );
};

export default Button;
