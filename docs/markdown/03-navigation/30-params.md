<!-- .slide: class="with-code" -->

# Reading `[id]` back: the `params` prop

Next.js captures whatever matched `[id]` in the URL and hands it to the page
through a `params` prop. In this version of Next.js, `params` is a
**Promise** — you `await` it before reading anything off it:

<small>

```tsx
// app/(dashboard)/employees/[id]/page.tsx
const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = employeesData.find(employee => employee.id === params.id);

  if (!employee) return <PageTitle backHref="/employees">Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref="/employees">
        {employee.firstname} {employee.lastname}
      </PageTitle>
      <PersonCard person={employee} />
    </>
  );
};
```

</small>

- The folder was `[id]`, so the key on `params` is `id` — `[slug]` would give
  you `params.slug` instead. The name is yours to pick.
- `params` being a Promise is why the component is `async` — nothing exotic,
  the same `async`/`await` you'd use for any other asynchronous value.
- Visit `/employees/42` and this exact file runs with
  `params` resolving to `{ id: '42' }` — no routing code, no `useParams`
  hook, just reading a prop.

Notes:

If someone asks "why a Promise, not just an object" — don't go deep, just say Next.js needs the flexibility to resolve route data asynchronously under the hood, and this is the stable contract as of this version. Worth mentioning params was synchronous in older Next.js (13/14) if anyone's seen older tutorials that skip the await — that's the tell they're reading outdated docs.
