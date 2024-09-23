'use client';

import Button from '@/components/Button';
import { useFormStatus } from 'react-dom';

type SubmitFormButtonProps = {
  children: React.ReactNode;
};

const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({ children, ...restProps }) => {
  const { pending } = useFormStatus();
  return (
    <Button loading={pending} {...restProps}>
      {children}
    </Button>
  );
};

export default SubmitFormButton;
