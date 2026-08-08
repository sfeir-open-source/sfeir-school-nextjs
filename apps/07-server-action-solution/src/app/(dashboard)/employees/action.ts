'use server';

import { UpsertEmployee } from '@sfeir/types';
import { postEmployee, putEmployee } from '@/app/providers/employees';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

const formDataToUpsertPerson = (form: FormData): UpsertEmployee => {
  return {
    firstname: form.get('firstname') as string,
    lastname: form.get('lastname') as string,
    email: form.get('email') as string,
    phone: form.get('phone') as string,
    birthDate: form.get('birthDate') as string,
    entryDate: form.get('entryDate') as string,
    isManager: false,
    manager: form.get('manager') as string,
    position: form.get('position') as string,
  };
};

export const createEmployee = async (form: FormData) => {
  const { id } = await postEmployee(formDataToUpsertPerson(form));
  revalidateTag('one-employee', { expire: 0 });
  redirect(`/employees/${id}`);
};

export const updateEmployee = async (form: FormData) => {
  const id = form.get('id') as string;
  await putEmployee(id, formDataToUpsertPerson(form));
  revalidateTag('all-employees', { expire: 0 });
  redirect(`/employees`);
};
