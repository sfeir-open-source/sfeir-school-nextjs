<!-- .slide: class="with-code" -->

# The declarative twin of that manual `notFound()` check

The last slide's `validIds.includes(id)` guard, hand-typed inside
`EmployeeDetailContent`, has an official name and a one-line config
equivalent — straight from the `generateStaticParams` reference:

```tsx
// app/(dashboard)/employees/[id]/page.tsx — what dynamicParams stands for
export const dynamicParams = false; // unlisted ids 404, no on-demand render

export async function generateStaticParams() {
  const ids = await getEmployeeIds();
  return ids.map(id => ({ id }));
}
```

<div>

- `dynamicParams` is a route segment config, same family as the `revalidate`
  and `dynamic` exports older Next.js material talks about. Left alone (or
  set to `true`), an id outside `generateStaticParams`' list still renders
  on demand — the ISR-flavored default from two slides ago. Set to `false`,
  Next.js itself 404s an unlisted id **before render**, no page code involved.
- This app's `employees/[id]` doesn't actually set the flag — it gets the
  same outcome by hand, re-checking the frozen `getEmployeeIds()` list and
  calling `notFound()` itself. Both paths end at the same 404; `dynamicParams
  = false` is the version that needs zero lines inside the component.
- `expenses/[id]` is the mirror case: no guard, no flag override, so it
  keeps Next.js's default — `dynamicParams` stays `true`, and an id outside
  the 5 prerendered ones falls through to a real render, exactly what the
  "subset at build" slide called the intended trade-off.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Worth being explicit that this app's choice to hand-roll the check isn't a mistake — it's what the lab has trainees build to feel the mechanism once, but in a real codebase `dynamicParams = false` is the one-line, framework-enforced way to say the same thing, and it's what "16-deploying-and-hosting" 's static-export slide references by name later.
