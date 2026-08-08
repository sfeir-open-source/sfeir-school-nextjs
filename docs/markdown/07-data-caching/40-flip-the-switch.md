<!-- .slide: class="with-code" -->

# Flipping the flag changes the rules

`cacheComponents` doesn't just unlock `'use cache'` — it also asks a
question of *every* page: "is this part of the page a photocopy, or does it
genuinely have to be redone on every request?" Anything in the second
category now needs to say so, with `<Suspense>`:

<small>

```tsx
// app/(dashboard)/employees/[id]/page.tsx
const EmployeeDetailContent = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const employee = await getEmployee(id); // cached — fine on its own
  return /* ... */;
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeDetailContent {...props} />
  </Suspense>
);
```

</small>

- `params` — the `[id]` segment — is only known once a real visitor hits a
  real URL, so it can't be part of a photocopy made in advance. `<Suspense>`
  is how a page says "wrap a fallback around the part that can't be known
  ahead of time."
- Don't worry about mastering `<Suspense>` today — module 12 starts
  unpacking what it actually does, and module 15 is entirely about it. For
  now, just recognize the shape: split the per-request part into its own
  component, wrap it, move on.
- Expect to add this shape to every page you touch in the lab —
  `employees/[id]`, `employees/[id]/edit`, `expenses`, `expenses/[id]`.

Notes:

Keep this brief and practical — the goal is "recognize the pattern and don't panic," not a Suspense deep-dive. If someone asks "why exactly," it's fair to say "great question, module 12 starts answering that, module 15 goes deep" and move on without guilt.
