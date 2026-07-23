<!-- .slide: class="with-code" -->

# You edited an employee. Say so.

You just saved changes to an employee — the photocopy `getEmployee` handed
out a moment ago is now wrong. `revalidateTag` is how something on the
server says "throw away every copy tagged `one-employee`":

<small>

```tsx
// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export const GET = (request: NextRequest) => {
  const tag = request.nextUrl.searchParams.get('tag');
  if (!tag) return Response.json({ error: 'No tags to revalidate' }, { status: 400 });

  if (tag === 'all') {
    revalidatePath('/', 'layout'); // no tag known → nuke everything instead
    return Response.json({ message: 'Revalidated all data' });
  }

  revalidateTag(tag, { expire: 0 }); // throw it away immediately
  return Response.json({ message: `Revalidated tag "${tag}"` });
};
```

</small>

- `revalidateTag` always takes a **second argument** now — a lifetime, not
  just the tag. `revalidateTag(tag)` alone is deprecated; `{ expire: 0 }`
  means "this copy is wrong right now, don't wait." This route exists to be
  called by something outside the render path — a webhook, an admin
  action — so immediate is the right call here.
- `revalidatePath('/', 'layout')` is the blunt fallback when you don't know
  (or don't care) which tag to target — it clears everything under `/`
  instead of one specific photocopy. Prefer tags when you can.
- Nothing about `getEmployee` itself changes. Revalidating doesn't edit the
  cached function — it just empties that one shelf, so the *next* call does
  the work again and refills it.

Notes:

If someone asks about the alternative { profile: 'max' } form used for stale-while-revalidate elsewhere in the docs — that's the softer option ("serve the old one a little longer while a fresh one loads in the background"), fine to mention if it comes up, but { expire: 0 } is what this app's route actually uses and is the right call for a webhook-style endpoint.
