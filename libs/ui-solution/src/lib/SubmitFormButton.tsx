'use client';

import { memo, ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './Button';

type SubmitFormButtonProps = {
  children: ReactNode;
};

const SubmitFormButton = memo(({ children, ...props }: SubmitFormButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button className="mt-4" loading={pending} {...props}>
      {children}
    </Button>
  );
});
export default SubmitFormButton;
