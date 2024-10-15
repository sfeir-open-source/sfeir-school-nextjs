'use server';

import { cookies } from 'next/headers';
import { login as loginFn } from '@/functions/auth';
import { redirect } from 'next/navigation';

export const login = async (_: unknown, formData: FormData) => {
  'use server';

  if (!formData) return { error: 'Username or password is invalid' };

  const username = (formData.get('username') || '') as string;
  const password = (formData.get('password') || '') as string;

  const token = await loginFn(username, password);

  if (token) {
    cookies().set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600,
      path: '/',
    });
    redirect('/');
  }

  return { error: 'Username or password is invalid' };
};
