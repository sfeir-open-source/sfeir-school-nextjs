import { cn } from '@sfeir/helpers';
import { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  id: string;
  type?: string;
  className?: string;
  errorMessages?: string;
};

export const TextField = ({ label, id, type = 'text', className, errorMessages, ...restProps }: TextFieldProps) => {
  return (
    <div className={cn(className)}>
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-slate-900 dark:text-gray-100">
          {label}
        </label>
      )}

      <input
        type={type}
        id={id}
        {...restProps}
        className={cn(
          'bg-gray-50 border  text-slate-900 text-sm rounded-lg block w-full p-2.5 dark:bg-slate-800 dark:border-gray-500 dark:text-white',
          errorMessages?.length ? 'border-red-500' : 'border-gray-300',
        )}
      />
      {errorMessages?.length && <p className="text-red-500 text-xs italic mt-2">{errorMessages}</p>}
    </div>
  );
};
