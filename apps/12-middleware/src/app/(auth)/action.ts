'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';

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

  (await cookies()).set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 3600,
    path: '/',
  });

  redirect('/');
};
