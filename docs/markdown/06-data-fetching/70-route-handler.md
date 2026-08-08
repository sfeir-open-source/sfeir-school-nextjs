<!-- .slide: class="with-code" -->

# `route.ts`: an API endpoint inside your app

`/api/expenses` isn't the Fastify server — it's a **Route Handler**, a plain
file in `app/` that responds to HTTP requests instead of rendering a page:

```tsx
// app/api/expenses/route.ts
import { NextRequest } from 'next/server';
import { getExpensesByEmployee } from '@/app/providers/expensees';

export const GET = async (request: NextRequest) => {
  const employeeId = request.nextUrl.searchParams.get('employeeId');
  const data = await getExpensesByEmployee(employeeId || '');
  return Response.json(data);
};
```

- `app/api/expenses/route.ts` maps to the URL `/api/expenses` — same
  file-based routing you already know from `page.tsx`, just a different
  special filename.
- `export const GET` handles `GET` requests specifically; `request` is a
  `NextRequest` — the standard Web `Request`, with `.nextUrl.searchParams`
  added for convenient query-string access. Return `Response.json(...)`, the
  standard Web `Response`.
- This code runs on the server, exactly like a page — so it can safely
  `import` the `getExpensesByEmployee` provider and its `API_KEY` header.
  `EmployeeExpenses` only ever talks to this handler, never to the real key.

Notes:

This is the same "small server-side wrapper" instinct as the providers, just exposed as a URL a Client Component can call. Point out this file lives right next to page.tsx files under app/ — same routing convention, different job.
