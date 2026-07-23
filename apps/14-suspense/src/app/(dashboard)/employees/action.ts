'use server';

import { postEmployee, putEmployee } from '@/app/providers/employees';
import { ApiError } from '@sfeir/helpers';
import { UpsertEmployee } from '@sfeir/types';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

type ActionState = {
  message?: string;
  errors?: Record<string, string>;
};

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

export const createEmployee = async (form: FormData): Promise<ActionState | void> => {
  let id: string;
  try {
    ({ id } = await postEmployee(formDataToUpsertPerson(form)));
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      console.log(error.errors);
      return { message: error.message, errors: error.errors };
    }
    throw error;
  }
  revalidateTag('one-employee', { expire: 0 });
  revalidateTag('employee-ids', { expire: 0 });
  redirect(`/employees/${id}`);
};

export const updateEmployee = async (form: FormData): Promise<ActionState | void> => {
  const id = form.get('id') as string;
  try {
    await putEmployee(id, formDataToUpsertPerson(form));
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      return { message: error.message, errors: error.errors };
    }
    throw error;
  }
  revalidateTag('all-employees', { expire: 0 });
  redirect(`/employees`);
};
