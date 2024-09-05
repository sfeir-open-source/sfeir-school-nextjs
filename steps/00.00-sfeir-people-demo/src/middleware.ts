import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/functions/auth';

const getAuthUser = async (request: NextRequest) => {
  const token = request.cookies.get('auth_token')?.value;
  if (!token) return null;
  const user = await verifyToken(token);
  return user;
};

export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;

  const user = await getAuthUser(request);
  if (path === '/login') {
    if (user) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
