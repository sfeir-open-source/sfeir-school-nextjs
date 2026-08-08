import { jwtVerify, SignJWT } from 'jose';

const TOKEN_TTL = '1h';

export const createToken = (username: string, secret: string) => {
  const authSecret = new TextEncoder().encode(secret);
  return new SignJWT({ username }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(TOKEN_TTL).sign(authSecret);
};

export const verifyToken = async (token: string, secret: string) => {
  try {
    const authSecret = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify<{ username: string }>(token, authSecret);
    return payload;
  } catch {
    return null;
  }
};

export const getSession = async (token: string | undefined, secret: string) => {
  if (!token) return null;
  return verifyToken(token, secret);
};
