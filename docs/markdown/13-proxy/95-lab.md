<!-- .slide: class="exercice" -->

<h1 id="proxy" style="margin-bottom: 30px;">13.01 - Proxy</h1>

## Lab

<small>

**1. Give the app its login gate**

- Create `src/proxy.ts`: export an async `proxy(request: NextRequest)` that
  reads the session cookie with `getSession` (from `@sfeir/helpers`), and
  redirects to `/login` when there's no session (unless already on
  `/login`), redirects to `/` when there **is** a session and the visitor is
  on `/login`, and otherwise calls `NextResponse.next()`
- Export a `config` alongside it with a `matcher` that excludes `api`,
  `_next/static`, `_next/image`, `favicon.ico`, and image file extensions

**2. Name the cookie once**

- In `app/shared/env.ts`, add `export const AUTH_COOKIE_NAME = 'auth_token';`
  and use it — in `proxy.ts`, in `(auth)/action.ts`'s `login` — instead of
  the raw string `'auth_token'`

**3. Add a way to log back out**

- In `(auth)/action.ts`, add a `logout` Server Action: delete the
  `AUTH_COOKIE_NAME` cookie, then `redirect('/login')`
- In `(dashboard)/layout.tsx`, add a small `<form action={logout}>` with a
  submit `Button` (from `@sfeir/ui/server`) near the sidebar's nav

**4. Break it on purpose, both directions**

- Clear cookies (or open a private tab) and visit `/employees` directly —
  confirm you land on `/login` instead
- Log in, then visit `/login` directly again — confirm you're bounced to
  `/` instead of seeing the form
- Click the new logout button — confirm it clears the cookie and lands you
  back on `/login`

**5. Verify against the solution**

- Run `12-middleware-solution` alongside yours and compare `src/proxy.ts`,
  `app/shared/env.ts`, `(auth)/action.ts` and `(dashboard)/layout.tsx`

</small>

<br/>

**ℹ️ Running the lab**<br/>
`12-middleware`'s `dev` target starts the `server` backend for you — just
run `npm run dev -- 12-middleware` (same for `12-middleware-solution`)

Notes:

12-middleware ships with a working login form, action, and /api/login route, but nothing reads the cookie back — that's the entire gap this lab closes. If a group finishes early, have them temporarily narrow the matcher to just '/employees' and reload /expenses without a session, to feel firsthand why the app's real matcher is a broad exclude-list rather than an allow-list of protected routes. This app's next.config.js already ships the redirects()/rewrites() the room built by hand in module 12's lab — no need to touch it here, proxy.ts is the only file this lab is about.
