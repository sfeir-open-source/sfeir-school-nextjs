<!-- .slide: class="with-code" -->

# `cacheTag`: a label on the photocopy

A photocopy with no label is a problem the day it goes stale — you'd have to
throw away *every* copy in the building just to get rid of one. `cacheTag`
writes a label on it, so you can target exactly the copies that are wrong:

<small>

```tsx
// app/providers/employees.ts
export async function getEmployees(search?: string) {
  'use cache';
  cacheTag('all-employees');
  // ...
}

export async function getEmployee(id: string) {
  'use cache';
  cacheTag('one-employee');
  // ...
}
```

</small>

- `getEmployees` and `getEmployee` get **different** tags — they're
  different photocopies of different things (a list vs. a single record), so
  they need to be throwable-away independently.
- The tag is just a string you choose. Nothing links it to a URL or a
  database table automatically — it links to whatever `cacheTag()` calls
  happened while that particular result was being produced.
- No tag yet, no `cacheLife()` either, on either function — meaning both
  currently fall back to Next.js's default cache lifetime. The next two
  slides are exactly about giving that a shape you control.

Notes:

If asked "what happens with no cacheTag at all" — the entry is still cached, it's just untaggable, so the only way to clear it is time passing (cacheLife's default) or a full redeploy. Tags are what make on-demand, targeted invalidation possible.
