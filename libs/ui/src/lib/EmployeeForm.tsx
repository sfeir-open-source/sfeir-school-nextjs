'use client';

import { Person } from '@sfeir/types';
import Image from 'next/image';
import { photoPlaceholder } from '../index';
import { Button } from './Button';
import { TextField } from './TextField';

type Action = (formData: FormData) => Promise<any>;

type EmployeeFormProps = {
  employee?: Person;
  action?: Action;
  className?: string;
};

export const EmployeeForm = ({ employee, action, className }: EmployeeFormProps) => {
  return (
    <form action={action} className={className}>
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
          <TextField id="firstname" name="firstname" label="First name" defaultValue={employee?.firstname} />
          <TextField id="lastname" name="lastname" label="Last name" defaultValue={employee?.lastname} />
          <TextField id="birthDate" name="birthDate" label="Birth date" defaultValue={employee?.birthDate} />
          <TextField id="email" name="email" label="Email address" defaultValue={employee?.email} />
          <TextField id="phone" name="phone" label="Phone number" defaultValue={employee?.phone} />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <TextField id="position" name="position" label="Role" defaultValue={employee?.position} />
          <TextField id="entryDate" name="entryDate" label="Entry date" defaultValue={employee?.entryDate} />
          <TextField id="manager" name="manager" label="Manager" defaultValue={employee?.manager} />
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="mt-4" variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};
