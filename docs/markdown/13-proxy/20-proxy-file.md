<!-- .slide: class="with-code" -->

# `proxy.ts`: one file, runs before any route renders

Next.js reserves one more filename, sitting next to `app/` rather than
inside it. A `proxy.ts` at the project root — here, next to `src/app`, so
it lives at `src/proxy.ts` — runs on the server for every matching request,
*before* Next.js picks a route and starts rendering it:

```tsx
// src/proxy.ts — shape, not the real logic yet
import { NextRequest, NextResponse } from 'next/server';

export const proxy = async (request: NextRequest) => {
  // read the request, decide what happens next
  return NextResponse.next(); // let it through, unchanged
};
```

<div>

- One export named `proxy` (a default export also works), one file, one job:
  look at the incoming request and decide what happens to it — let it
  through as-is, redirect it somewhere else, rewrite it to a different page,
  or answer it directly without ever reaching `app/`.
- That's exactly the "one place" the last slide was missing: a request for
  `/employees` gets a chance to be turned into a redirect to `/login` right
  here, before `DashboardLayout` or `EmployeesPage` ever run.
- `12-middleware`, the starter app, doesn't have this file yet — that's
  today's lab. `12-middleware-solution` already does.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Keep this slide purely mechanical — what the file is, where it sits, one export. The auth-specific version of proxy() comes on a later slide once matcher and cookies have both been introduced.
