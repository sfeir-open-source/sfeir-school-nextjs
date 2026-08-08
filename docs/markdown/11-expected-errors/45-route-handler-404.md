<!-- .slide: class="with-code" -->

# `notFound()` renders UI — a Route Handler just returns a status

`notFound()` only makes sense where there's a page to swap out for
`not-found.tsx`. A Route Handler from module 06 isn't rendering anything —
its whole job is to answer with a plain HTTP response, so "not found" means
something different there:

<small>

```tsx
// app/api/employees/[id]/route.ts — illustrative, same shape as module 06's GET
import { NextRequest } from 'next/server';
import { ApiError } from '@sfeir/helpers';
import { getEmployee } from '@/app/providers/employees';

export const GET = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    return Response.json(await getEmployee(id));
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return Response.json({ message: 'Employee not found' }, { status: 404 });
    }
    throw error;
  }
};
```

</small>

- Same `catch`-the-expected-case shape as every other slide this module —
  the difference is entirely in what runs on the `404` branch: a page calls
  `notFound()` so Next.js can render `not-found.tsx`; a Route Handler just
  sets `{ status: 404 }` on the `Response` it was always going to return.
- The caller here isn't a browser rendering a page — it's `curl`, a mobile
  app, another service. A `404` status code *is* the UI for an API: no HTML
  to swap in, just the number REST clients already know how to check.
- Calling `notFound()` inside a Route Handler would be the wrong tool — it
  throws Next.js's special not-found interrupt looking for a `not-found.tsx`
  to render, and a Route Handler was never going to render one.

Notes:

Quick contrast slide, one example, don't over-build it — the app's real employees[id] route in module 06 doesn't have this branch, this is illustrative like the POST/PUT/DELETE slides were. The one sentence to land: notFound() is a rendering concern (which file shows), an HTTP status code is a protocol concern (what the response means) — same "expected outcome, not a crash" instinct, two different tools depending on whether you're rendering a page or answering a request.
