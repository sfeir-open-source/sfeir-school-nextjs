<!-- .slide: class="with-code" -->

# Visiting an id that wasn't baked

`generateStaticParams` only covers the ids it knows about. So what happens
when a visitor lands on `/employees/9999`, an id that doesn't exist —
or `/expenses/<id>` outside the 5 that got prerendered?

```tsx
// app/(dashboard)/employees/[id]/page.tsx
const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const validIds = await getEmployeeIds(); // frozen since the last build/deploy
  if (!validIds.includes(id)) {
    notFound(); // module 11 — same function, same not-found.tsx
  }
  // ...
};
```

<div>

- Left alone, Next.js's default is friendlier than a flat 404: an id you
  didn't list gets the reusable **App Shell** immediately, then Next.js
  renders and caches that specific page in the background — the next
  visitor gets it instantly. That's what the docs call **Incremental
  Static Regeneration** applied to params.
- This app chooses a stricter path instead: `getEmployeeIds` is cached with
  `cacheLife('max')`, frozen until the next deploy, and the page re-checks
  `validIds.includes(id)` on every visit — anything outside that frozen list
  is an immediate `notFound()`, not "wait, we'll fetch it." An employee
  created after the last build simply won't resolve until the app
  redeploys — a deliberate trade-off for predictability over
  always-fresh-on-first-visit.
- `expenses/[id]` doesn't add that guard at all — an id outside its 5
  prerendered ones just falls through to `getExpenseById`'s own fetch,
  which already 404s and hits the same `notFound()` catch block from
  module 11. Two different comfort levels, same underlying escape hatch.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

If asked "why not just let Next.js's automatic ISR-on-first-visit handle unknown employee ids too" — fair question, entirely legitimate choice. This app picked the stricter guard specifically to make the lab's behavior predictable and easy to reason about in the room; either is correct engineering, they're different trade-offs.
