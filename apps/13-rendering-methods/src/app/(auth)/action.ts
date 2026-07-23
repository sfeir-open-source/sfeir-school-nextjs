'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { AUTH_COOKIE_NAME } from '../shared/env';

export type ActionState = { error: string | null };
export type Action = (state: ActionState, formData: FormData) => Promise<ActionState>;

export const login: Action = async (_, formData) => {
  if (!formData) return { error: 'Username or password is invalid' };

  const username = (formData.get('username') || '') as string;
  const password = (formData.get('password') || '') as string;

  if (!username || !password) return { error: 'Username or password is invalid' };

  const host = (await headers()).get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  const response = await fetch(`${protocol}://${host}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) return { error: 'Username or password is invalid' };

  const { token } = (await response.json()) as { token: string };

  (await cookies()).set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

  redirect('/');
};

export const logout = async () => {
  (await cookies()).delete({ name: AUTH_COOKIE_NAME, path: '/' });
  redirect('/login');
};
