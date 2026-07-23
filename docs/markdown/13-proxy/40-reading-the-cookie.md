<!-- .slide: class="with-code" -->

# Same cookie, read on the way in

Module 08's `login` action already writes a signed token into a cookie
after a successful login. `proxy()` reads that exact cookie back, on every
matching request, through `request.cookies` — the `NextRequest` equivalent
of the `cookies()` function you already know from Server Components:

```tsx
// src/proxy.ts (12-middleware-solution)
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@sfeir/helpers';
import { AUTH_COOKIE_NAME, AUTH_SECRET } from '@/app/shared/env';

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const session = await getSession(request.cookies.get(AUTH_COOKIE_NAME)?.value, AUTH_SECRET ?? '');
  const isLoginPage = pathname === '/login';
  // ...
};
```

<div>

- `request.cookies.get(AUTH_COOKIE_NAME)?.value` pulls the raw token
  straight off the incoming request — no round trip, the browser sent it
  along with the request automatically because `login` set it `httpOnly`.
- `getSession` (from `@sfeir/helpers`) verifies that token's signature and
  expiry using the same `AUTH_SECRET` it was signed with. No token, or a
  tampered/expired one, and it resolves to `null` — that's "no session."
  A valid one resolves to the decoded payload — that's "session."
- Nothing here touches a database. It's a signature check against a secret
  the server already holds — cheap enough to run on every single request
  this app matches.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Worth naming explicitly: this is checking a JWT's signature, not looking a session up in a store. That distinction sets up the caution slide later — it's exactly the kind of check Next.js's own docs call an "optimistic" check, cheap enough to run in proxy on every request.
