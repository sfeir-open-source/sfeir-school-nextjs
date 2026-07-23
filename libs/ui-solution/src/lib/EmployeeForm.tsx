'use client';

import { Person } from '@sfeir/types';
import Image from 'next/image';
import { photoPlaceholder } from '../index';
import { TextField } from './TextField';
import SubmitFormButton from './SubmitFormButton';
import { useActionState } from 'react';

type Action = (formData: FormData) => Promise<State | void>;

type State = {
  message?: string;
  errors?: Record<string, string>;
};

type EmployeeFormProps = {
  employee?: Person;
  action?: Action;
  className?: string;
};

export const EmployeeForm = ({ employee, action, className }: EmployeeFormProps) => {
  const [state, formAction] = useActionState(async (previousState: State, formData: FormData) => {
    const result = await action?.(formData);
    return result ?? previousState;
  }, {} as State);
  return (
    <form action={formAction} className={className}>
      {employee && <input type="hidden" name="id" value={employee.id} />}
      <div className="flex justify-center w-full">
        <Image
          src={employee?.photo || photoPlaceholder}
          alt={employee ? `Picture of ${employee?.firstname}` : 'Missing picture'}
          width="120"
          height="120"
          className="block rounded-full"
        />
      </div>
      <div className="flex w-full gap-14 mt-4">
        <div className="w-1/2 flex flex-col gap-4">
          <TextField id="firstname" name="firstname" label="First name" defaultValue={employee?.firstname} errorMessages={state?.errors?.firstname} />
          <TextField id="lastname" name="lastname" label="Last name" defaultValue={employee?.lastname} errorMessages={state?.errors?.lastname} />
          <TextField id="birthDate" name="birthDate" label="Birth date" defaultValue={employee?.birthDate} errorMessages={state?.errors?.birthDate} />
          <TextField id="email" name="email" label="Email address" defaultValue={employee?.email} errorMessages={state?.errors?.email} />
          <TextField id="phone" name="phone" label="Phone number" defaultValue={employee?.phone} errorMessages={state?.errors?.phone} />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <TextField id="position" name="position" label="Role" defaultValue={employee?.position} errorMessages={state?.errors?.position} />
          <TextField id="entryDate" name="entryDate" label="Entry date" defaultValue={employee?.entryDate} errorMessages={state?.errors?.entryDate} />
          <TextField id="manager" name="manager" label="Manager" defaultValue={employee?.manager} errorMessages={state?.errors?.manager1} />
        </div>
      </div>
      <div className="flex justify-center">
        <SubmitFormButton>Submit</SubmitFormButton>
      </div>
    </form>
  );
};
