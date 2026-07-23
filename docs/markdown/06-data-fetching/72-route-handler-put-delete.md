<!-- .slide: class="with-code" -->

# Same idea, one level down: `PUT` and `DELETE`

A dynamic segment works on a `route.ts` exactly like it does on a
`page.tsx` — `params` is just awaited the same way:

<small>

```tsx
// app/api/employees/[id]/route.ts — illustrative, same caveat as the previous slide
import { NextRequest } from 'next/server';
import { UpsertEmployee } from '@sfeir/types';
import { putEmployee } from '@/app/providers/employees';

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const body = (await request.json()) as UpsertEmployee;
  return Response.json(await putEmployee(id, body));
};

export const DELETE = async (_request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  // no delete provider exists in this app today — shown for the shape only
  return new Response(null, { status: 204 });
};
```

</small>

- `PUT /api/employees/42` and `DELETE /api/employees/42` — the `[id]` in the
  folder name becomes `params.id` inside either handler, same mechanic as
  `app/employees/[id]/page.tsx`.
- `new Response(null, { status: 204 })` is the standard shape for "it
  worked, there's nothing to send back" — common for a successful `DELETE`.
- Real API clients (Postman, `curl`, a mobile app) expect exactly this REST
  vocabulary: the verb tells them what happened, the status code tells them
  whether it worked.

Notes:

DELETE has no real provider behind it in this app (postEmployee/putEmployee exist for module 08's lab, deleteEmployee doesn't) — say so plainly if asked, it's here to complete the picture of "one file, every verb," not to imply a missing feature. Keep the pace brisk, this is confirmation of the previous slide's idea more than a new one.
