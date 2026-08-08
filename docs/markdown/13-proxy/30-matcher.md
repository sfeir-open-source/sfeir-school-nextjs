<!-- .slide: class="with-code" -->

# `matcher`: telling `proxy()` which requests to bother with

Without a `matcher`, `proxy()` runs on **every** request — including static
files, `_next/static`, `_next/image`, anything in `public/`. For an auth
check, that's a problem: it would start deciding whether the sidebar's
logo `.svg` is "logged in" too. `config.matcher` scopes it down:

```tsx
// src/proxy.ts (12-middleware-solution)
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
```

<div>

- Read as a sentence: "match every path, **except** the ones starting with
  `api`, `_next/static`, `_next/image`, `favicon.ico`, or ending in one of
  those image extensions." The `(?!...)` is a *negative lookahead* — a regex
  way of saying "not this."
- `/api/login` and `/api/expenses` are deliberately excluded: those are
  fetched by the browser and by Server Actions, not visited as pages — a
  redirect response in the middle of a `fetch()` call would just break the
  request, not send anyone anywhere.
- Everything else — `/`, `/employees`, `/expenses/42`, `/login` itself —
  still matches, which is exactly what a login gate needs: `proxy()` has to
  see `/login` too, to know whether to redirect *away* from it.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

If the room asks "why not just list /employees and /expenses instead of excluding stuff": say that Next.js's own guidance for auth is a matcher that runs proxy on effectively everything except assets and API routes, precisely because forgetting to add a brand-new page to an allow-list is how routes end up unprotected by accident.
