import clsx from 'clsx';

type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  type?: string;
  className?: string;
  errorMessages?: Array<string>;
};

const TextField: React.FC<TextFieldProps> = ({ label, id, type = 'text', className, errorMessages, ...restProps }) => {
  return (
    <div className={className}>
      <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...restProps}
        className={clsx(
          'bg-gray-50 border  text-gray-900 text-sm rounded-lg block w-full p-2.5',
          errorMessages?.length ? 'border-red-500' : 'border-gray-300'
        )}
      />
      {errorMessages?.length && <p className="text-red-500 text-xs italic mt-2">{errorMessages[0]}</p>}
    </div>
  );
};

export default TextField;
