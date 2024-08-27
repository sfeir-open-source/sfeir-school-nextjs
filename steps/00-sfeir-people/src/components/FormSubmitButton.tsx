'use client';

import { useFormStatus } from 'react-dom';
import Button, { ButtonProps } from './Button';
import Loader from './Icons/Loader';

const FormSubmitButton: React.FC<ButtonProps<'button'>> = ({ children, ...restProps }) => {
  const { pending } = useFormStatus();

  return (
    <Button {...restProps} type="submit">
      {children}
      {pending && <Loader className="inline w-4 h-4 ml-2 text-white animate-spin" />}
    </Button>
  );
};

export default FormSubmitButton;
