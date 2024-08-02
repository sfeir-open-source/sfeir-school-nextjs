import * as peopleApi from '@/api/people';
import { cleanObject } from '@/functions/data';
import { revalidateTag } from 'next/cache';

export const update = async (userId: string, formData: FormData) => {
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

  await peopleApi.updateOne(payload);

  revalidateTag(userId);
};

export const create = () => {};
