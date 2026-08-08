<!-- .slide: class="with-code" -->

# `employees/[id]`: infinite URLs, finite employees

`[id]` in the folder name means the segment can technically be anything —
`/employees/abc`, `/employees/999`, `/employees/anything`. Next.js has no
way to pre-build a page for every string that could ever exist. But this
app's employees aren't infinite — they're a real, bounded list, sitting in
the same backend `getEmployees` already reads:

```tsx
// app/providers/employees.ts
export async function getEmployeeIds(): Promise<string[]> {
  'use cache';
  cacheTag('employee-ids');
  cacheLife('max'); // ← frozen until the next build/deploy, nothing revalidates it
  const { items } = await fetchEmployees({ per_page: 100 });
  return items.map(item => item.id);
}
```

<div>

- The insight: if Next.js *knew* the list of ids ahead of time, it could
  treat `/employees/12` exactly like the sidebar — build the HTML once,
  hand out the same photocopy to every visitor, forever (or until the next
  deploy).
- `getEmployeeIds` is just another cached function, same shape as every
  provider since module 07 — except what it returns isn't the data itself,
  it's the *list of valid keys* into that data.
- `cacheLife('max')` is deliberate here: this list should only change on a
  fresh deploy, not on a schedule — module 07's `cacheLife('hours')` would
  be the wrong instinct for "the set of ids that exist right now."

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the setup slide — resist explaining generateStaticParams yet, that's next. The only job here is landing "a dynamic segment can still have a knowable, finite set of real values" before showing the API that acts on it.
