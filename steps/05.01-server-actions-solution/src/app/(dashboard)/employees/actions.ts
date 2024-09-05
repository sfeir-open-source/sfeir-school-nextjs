'use server';

import * as peopleApi from '@/api/people';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const create = async (formData: FormData) => {
  const payload = {
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    position: formData.get('position') as string,
    entryDate: formData.get('entryDate') as string,
    birthDate: formData.get('birthDate') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    isManager: false,
  };

  const employee = await peopleApi.create(payload);

  revalidateTag('all-employees');
  redirect(`/employees/${employee.id}`);
};

export const update = async (id: string, formData: FormData) => {
  const payload = {
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    position: formData.get('position') as string,
    entryDate: formData.get('entryDate') as string,
    birthDate: formData.get('birthDate') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    isManager: false,
    id,
  };

  const employee = await peopleApi.updateOne(payload);
  revalidateTag('employees');
  redirect(`/employees/${employee.id}`);
};
