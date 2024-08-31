import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = 'jwt-key';

const DEMO_USER = {
  username: 'demo',
  password: 'password123',
};

export const login = (username: string, password: string): Promise<string> | null => {
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60;

    return new SignJWT({ username })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(SECRET_KEY));
  }
  return null;
};

export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY));
    return payload;
  } catch (error) {
    return null;
  }
};
