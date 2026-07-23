<!-- .slide: class="with-code" -->

# Two doors, each one locked from the other side

A login gate isn't one rule, it's two: no session shouldn't reach the
dashboard, and a session shouldn't be able to reach `/login` again either.
`12-middleware-solution`'s `proxy()` ends with exactly those two checks:

```tsx
// src/proxy.ts (12-middleware-solution) — continued
  if (!session && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (session && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};
```

<div>

- **No session, not already on `/login`**: `NextResponse.redirect(...)`
  sends the browser a `302` to `/login` — the dashboard's HTML is never
  rendered, never sent. This is the fix for the hole from the first slide.
- **A session, but heading to `/login`**: redirected straight back to `/` —
  an already-logged-in visitor typing `/login` in the address bar lands on
  the dashboard instead of a pointless login form.
- **Everything else** — a session on a dashboard route, or no session on
  `/login` itself — falls through to `NextResponse.next()`: "let this
  request continue exactly as it was going to." That's the equivalent of
  the empty `proxy()` from two slides ago, reached only once both checks
  above have cleared it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Walk both branches with a live browser if you can: one incognito tab with no cookie hitting /employees (redirected to /login), one already-logged-in tab hitting /login directly (redirected to /). Seeing both directions land is more convincing than reading the code.
