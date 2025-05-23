'use client';

import { useActionState } from 'react';

import Image from 'next/image';
import TextField from '@/components/TextField';
import { Person } from '@/types';
import FormSubmitButton from './FormSubmitButton';

import placeholderImage from '@/assets/images/profile-placeholder.jpg';

type ActionState = {
  validationErrors?: { [key: string]: Array<string> };
};

type Action = (id: string, formData: FormData) => Promise<void | ActionState>;

type EmployeeFormProps = {
  employee?: Person;
  action: Action;
  className?: string;
};

const initialState = {
  validationErrors: {},
} as ActionState;

const EmployeeForm: React.FC<EmployeeFormProps> = ({ employee, action, className }) => {
  // @ts-ignore
  const [state, formAction] = useActionState<ActionState, Action>(action, initialState as unknown as void);

  return (
    <form action={formAction} className={className}>
      <div className="flex justify-center w-full">
        <Image
          src={employee?.photo || placeholderImage}
          alt={employee ? `Picture of ${employee?.firstname}` : 'Missing picture'}
          width="120"
          height="120"
          className="block rounded-full"
        />
      </div>
      <div className="flex w-full gap-14 mt-4">
        <div className="w-1/2 flex flex-col gap-4">
          <TextField
            id="firstname"
            name="firstname"
            label="First name"
            defaultValue={employee?.firstname}
            errorMessages={state?.validationErrors?.firstname}
          />
          <TextField
            id="lastname"
            name="lastname"
            label="Last name"
            defaultValue={employee?.lastname}
            errorMessages={state?.validationErrors?.lastname}
          />
          <TextField
            id="birthDate"
            name="birthDate"
            label="Birth date"
            defaultValue={employee?.birthDate}
            errorMessages={state?.validationErrors?.birthDate}
          />
          <TextField
            id="email"
            name="email"
            label="Email address"
            defaultValue={employee?.email}
            errorMessages={state?.validationErrors?.email}
          />
          <TextField
            id="phone"
            name="phone"
            label="Phone number"
            defaultValue={employee?.phone}
            errorMessages={state?.validationErrors?.phone}
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <TextField
            id="position"
            name="position"
            label="Role"
            defaultValue={employee?.position}
            errorMessages={state?.validationErrors?.position}
          />
          <TextField
            id="entryDate"
            name="entryDate"
            label="Entry date"
            defaultValue={employee?.entryDate}
            errorMessages={state?.validationErrors?.entryDate}
          />
          <TextField
            id="manager"
            name="manager"
            label="Manager"
            defaultValue={employee?.manager}
            errorMessages={state?.validationErrors?.manager}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <FormSubmitButton className="mt-4" variant="primary">
          Submit
        </FormSubmitButton>
      </div>
    </form>
  );
};

export default EmployeeForm;
