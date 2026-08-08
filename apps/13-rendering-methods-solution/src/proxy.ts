import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@sfeir/helpers';
import { AUTH_COOKIE_NAME, AUTH_SECRET } from '@/app/shared/env';

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const session = await getSession(request.cookies.get(AUTH_COOKIE_NAME)?.value, AUTH_SECRET ?? '');
  const isLoginPage = pathname === '/login';

  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
