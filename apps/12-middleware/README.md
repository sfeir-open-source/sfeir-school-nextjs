# 12 - Proxy (the file formerly known as `middleware.ts`)

## What you'll build

A `src/proxy.ts` file (the Next.js 16 successor to `middleware.ts`) that
runs before every matching request, reads the signed-in session off the
`auth_token` cookie, and redirects accordingly: no session trying to reach
the dashboard gets sent to `/login`; a session trying to reach `/login` gets
sent back to `/`. You'll also add a `logout` Server Action so there's a way
back out. Today, opening a private/incognito tab (no cookies at all) and
going straight to `/employees` or `/expenses` renders the dashboard anyway —
nothing ever checks whether you're logged in. This lab closes that gap.

## Concepts you'll practice

- **`proxy.ts`, not `middleware.ts`.** Next.js 16 renamed the "runs before
  every matching request" file convention from `middleware.ts` to
  `proxy.ts` — same job, new name. It lives next to `src/app`, i.e. at
  `src/proxy.ts`, not inside `app/`.
  ([Middleware docs](https://nextjs.org/docs/app/building-your-application/routing/middleware))
- **One export, one job.** The file exports an (async) function — named
  `proxy`, or a default export — that receives a `NextRequest` and returns
  either `NextResponse.next()` (let the request continue unmodified) or a
  redirect/rewrite response.
  ([`NextResponse` docs](https://nextjs.org/docs/app/api-reference/functions/next-response))
- **`config.matcher`.** Without it, your function runs on *every* request,
  including static assets and `_next/*` internals. `matcher` is an array of
  path patterns (or a single regex-like string) that scopes it down to the
  paths you actually care about.
  ([Matcher docs](https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher))
- **Reading a cookie off the request.** `request.cookies.get(name)?.value`
  is the `NextRequest` equivalent of the `cookies()` function you already
  used in Server Components — no round trip, the browser sends the cookie
  with the request automatically.
  ([`NextRequest` docs](https://nextjs.org/docs/app/api-reference/functions/next-request))
- **Two redirects, not one.** A login gate has two directions: no session
  trying to reach the dashboard gets sent to `/login`; a session trying to
  reach `/login` gets sent back to `/`. Miss the second one and a logged-in
  visitor can still see the login form.
- **Cookies as a shared constant.** The name of the auth cookie needs to
  match between where it's *set* (`login` action) and where it's *read*
  (`proxy.ts`) — a single exported constant in `shared/env.ts` prevents the
  two from drifting apart.
  ([Cookies docs](https://nextjs.org/docs/app/api-reference/functions/cookies))

## Steps

### 1. Create `src/proxy.ts`

Put it next to `src/app` (so the path is `apps/12-middleware/src/proxy.ts`,
not inside `src/app/`). Export an async function named `proxy` that takes a
`NextRequest`.

```ts
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@sfeir/helpers';
import { AUTH_COOKIE_NAME, AUTH_SECRET } from '@/app/shared/env';

export async function proxy(request: NextRequest) {
  // steps 3 & 4 go here
}

export const config = {
  // step 5
};
```

### 2. Give the cookie a shared name

In `src/app/shared/env.ts`, add:

```ts
export const AUTH_COOKIE_NAME = 'auth_token';
```

Use this constant — not the raw string `'auth_token'` — in both
`src/proxy.ts` and wherever `(auth)/action.ts`'s `login` action sets the
cookie today.

### 3. Read the session in `proxy()`

Inside `proxy`, pull the cookie value off the incoming request and pass it
to `getSession` (exported from `@sfeir/helpers`) along with `AUTH_SECRET`
(from `shared/env.ts`) to get back either `null` (no/invalid session) or a
decoded session payload.

```ts
const { pathname } = request.nextUrl;
const cookieValue = request.cookies.get(AUTH_COOKIE_NAME)?.value;
const session = await getSession(cookieValue, AUTH_SECRET ?? '');
```

### 4. Implement the two redirects

Using the current pathname (`request.nextUrl.pathname`) and the session you
just resolved:

- No session, and the visitor isn't already on `/login` → redirect to
  `/login`.
- A session, but the visitor is on `/login` → redirect to `/`.
- Anything else → let the request continue as normal.

Look at `NextResponse.redirect(new URL(path, request.url))` and
`NextResponse.next()`.

```ts
// available building blocks — you decide which condition uses which
NextResponse.redirect(new URL('/login', request.url));
NextResponse.redirect(new URL('/', request.url));
NextResponse.next();

// TODO: figure out, from `session` and `pathname`, which of the three
// lines above applies for each of: no session + not on /login,
// a session + on /login, and everything else. Return that response.
```

### 5. Export a `matcher`

Alongside `proxy`, export a `config` object. `matcher` is an array of path
patterns — each entry is either a simple path (`'/dashboard'`), a path with
a `:param*` segment, or a negative-lookahead regex string that *excludes*
everything except what you list:

```ts
export const config = {
  matcher: [
    // TODO: this single pattern currently only excludes _next internals and
    // favicon.ico — extend the negative lookahead so it also excludes
    // '/api/*' and common image extensions (svg, png, jpg, jpeg, gif, webp)
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

Think about *why* each of those needs excluding — in particular, why
`/api/*` routes shouldn't get redirected the same way pages do (they're
fetched by `fetch()`/Server Actions, not visited in a browser tab). An
allow-list (matching only `/employees` and `/expenses`, say) is the wrong
shape here: every new protected page you add later would start unprotected
until someone remembers to add it to the list.

### 6. Add a way to log back out

In `(auth)/action.ts`, add a `logout` Server Action that deletes the
`AUTH_COOKIE_NAME` cookie and then `redirect('/login')`. Wire it up in
`(dashboard)/layout.tsx` with a small `<form action={logout}>` containing a
submit `Button` (from `@sfeir/ui/server`) near the sidebar's nav.

```ts
// (auth)/action.ts
export const logout = async () => {
  // TODO: delete the AUTH_COOKIE_NAME cookie, then redirect('/login')
};
```

```tsx
// (dashboard)/layout.tsx
import { Button } from '@sfeir/ui/server';
import { logout } from '../(auth)/action';

// ...near the sidebar's nav
<form action={logout}>
  <Button type="submit">Logout</Button>
</form>;
```

### 7. Break it on purpose, both directions

- Clear cookies (or use a private tab) and visit `/employees` directly —
  confirm you land on `/login`.
- Log in, then visit `/login` directly again — confirm you're bounced to
  `/` instead of seeing the form.
- Click the new logout button — confirm it clears the cookie and lands you
  back on `/login`.

### 8. Verify against the solution

Run `12-middleware-solution` alongside your app and diff `src/proxy.ts`,
`src/app/shared/env.ts`, `(auth)/action.ts`, and `(dashboard)/layout.tsx`
against what you wrote.

## Running the exercise

```
npm run dev -- 12-middleware
```

This app's `dev` target also starts the shared `server` backend for you —
no separate terminal needed.

## Troubleshooting

- **Nothing happens, the dashboard is still wide open.** Double-check the
  file is named `src/proxy.ts`, not `src/middleware.ts`. Next.js 16 only
  looks for `proxy.ts` — an old `middleware.ts` is silently ignored, not an
  error.
- **Redirects work on some routes but not others.** Your `matcher` regex is
  probably too narrow (an accidental allow-list instead of an
  exclude-list). Match *everything* except the assets/API paths that must
  stay untouched — an allow-list means every new page you add later starts
  unprotected until someone remembers to add it.
- **Infinite redirect loop on `/login`.** This happens when the "no
  session → `/login`" check doesn't exclude the case where you're already
  on `/login`. Make sure that branch checks `!isLoginPage` (or equivalent)
  before redirecting.
- **You're always treated as logged out even after logging in.** Check
  you're reading the same cookie name that `login` writes — this is exactly
  why step 2 centralizes it as `AUTH_COOKIE_NAME` instead of two separate
  string literals that can drift apart.
- **`getSession` throws or always returns `null`.** Confirm `AUTH_SECRET` is
  actually set in `.env.local` and that you're passing the same secret used
  when the cookie was signed in `login`.
