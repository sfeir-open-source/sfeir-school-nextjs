'use server';

import { ApiError } from '@/api/error';
import * as peopleApi from '@/api/people';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const create = async (state: any, formData: FormData) => {
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

  try {
    const employee = await peopleApi.create(payload);
    revalidateTag('all-employees');
    redirect(`/employees/${employee.id}`);
  } catch (err: unknown) {
    if (err instanceof ApiError && err?.body) {
      return err.body;
    }
    return { error: 'unexpected error' };
  }
};

export const update = async (id: string, state: any, formData: FormData) => {
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

  try {
    const employee = await peopleApi.updateOne(payload);
    revalidateTag('employees');
    redirect(`/employees/${employee.id}`);
  } catch (err: unknown) {
    if (err instanceof ApiError && err?.body) {
      return err.body;
    }
    return { error: 'unexpected error' };
  }
};
