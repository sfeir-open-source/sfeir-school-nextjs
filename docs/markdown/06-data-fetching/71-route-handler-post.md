<!-- .slide: class="with-code" -->

# More than `GET`: creating a resource

`GET` isn't special — it's just one named export. Every HTTP method
([`GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`](https://nextjs.org/docs/app/api-reference/file-conventions/route#http-methods))
can live in the same `route.ts`, one export per verb:

<small>

```tsx
// app/api/employees/route.ts — illustrative: this app wires creates through
// a Server Action instead (module 08), but the same domain works just as well here
import { NextRequest } from 'next/server';
import { UpsertEmployee } from '@sfeir/types';
import { getEmployees, postEmployee } from '@/app/providers/employees';

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get('search') || '';
  return Response.json(await getEmployees(search));
};

export const POST = async (request: NextRequest) => {
  const body = (await request.json()) as UpsertEmployee;
  const created = await postEmployee(body);
  return Response.json(created, { status: 201 });
};
```

</small>

- `request.json()` parses the request body — the same standard `Request`
  method any `fetch` caller already knows, no framework-specific body
  parser to configure.
- `Response.json(created, { status: 201 })` — the second argument is how a
  Route Handler tells a caller "created", instead of the default `200`.
  Same idea as `{ status: 400 }` for a bad request.
- Which export runs is decided by the incoming request's HTTP method, not by
  anything in the URL — `POST /api/employees` and `GET /api/employees` are
  the exact same route, handled by two different functions.

Notes:

Point out explicitly that this app's real employee-creation flow goes through a Server Action (module 08), not this route — this slide is showing what the same domain would look like as a Route Handler, for the shape of the API, not a second implementation to maintain. The GET here mirrors 06-data-fetching/40's getEmployees, just reachable over HTTP instead of imported directly.
