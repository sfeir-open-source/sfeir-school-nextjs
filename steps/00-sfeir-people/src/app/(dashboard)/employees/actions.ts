import { ApiError } from '@/api/error';
import * as peopleApi from '@/api/people';
import { cleanObject } from '@/functions/data';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const update = async (userId: string, _: unknown, formData: FormData) => {
  'use server';

  const payload = cleanObject({
    id: userId,
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    position: formData.get('position') as string,
    entryDate: formData.get('entryDate') as string,
    birthDate: formData.get('birthDate') as string,
    gender: formData.get('gender') as string,
    managerId: formData.get('managerId') as string,
  });

  try {
    await peopleApi.updateOne(payload);
  } catch (err: unknown) {
    if (err instanceof ApiError && err?.body) {
      return err.body;
    }
    return { error: 'unexpected error' };
  }

  revalidateTag(`employee-${userId}`);
  revalidateTag('employee-list');
  redirect(`/employees/${userId}`);
};

export const create = async (_: unknown, formData: FormData) => {
  'use server';

  const payload = cleanObject({
    firstname: formData.get('firstname') as string,
    lastname: formData.get('lastname') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    position: formData.get('position') as string,
    entryDate: formData.get('entryDate') as string,
    birthDate: formData.get('birthDate') as string,
    gender: formData.get('gender') as string,
    isManager: (formData.get('isManager') || false) as boolean,
    managerId: formData.get('managerId') as string,
  });

  let employee = null;

  try {
    employee = await peopleApi.create(payload);
  } catch (err: unknown) {
    if (err instanceof ApiError && err?.body) {
      return err.body;
    }
    return { error: 'unexpected error' };
  }

  revalidateTag('employee-list');
  redirect(`/employees/${employee.id}`);
};
