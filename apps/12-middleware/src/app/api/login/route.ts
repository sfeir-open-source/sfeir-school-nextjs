import { NextRequest } from 'next/server';
import { createToken, verifyToken } from '@sfeir/helpers';

import { AUTH_SECRET } from '@/app/shared/env';

export const POST = async (request: NextRequest) => {
  const { username, password } = (await request.json().catch(() => ({}))) as { username?: string; password?: string };

  if (!username || !password) {
    return Response.json({ message: 'Username or password is invalid' }, { status: 401 });
  }

  const token = await createToken(username, AUTH_SECRET ?? '');
  return Response.json({ token });
};

export const GET = async (request: NextRequest) => {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ?? request.cookies.get('auth_token')?.value;

  if (!token) {
    return Response.json({ valid: false }, { status: 401 });
  }

  const payload = await verifyToken(token, AUTH_SECRET ?? '');
  if (!payload) {
    return Response.json({ valid: false }, { status: 401 });
  }

  return Response.json({ valid: true, username: payload.username });
};
