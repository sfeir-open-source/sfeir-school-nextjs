<!-- .slide: class="with-code" -->

# `await`. That's the whole trick.

The `EmployeeDetail` page from module 04 already had the shape — no
`useEffect`, no loading state, just an `async` function that awaits before it
returns markup. Point it at the real API and nothing about that shape
changes:

<small>

```tsx
// app/(dashboard)/employees/page.tsx
import { getEmployees } from '@/app/providers/employees';

const Employees = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const search = (await searchParams).search || '';
  const employees = await getEmployees(search);

  return (
    <div className="grid grid-cols-4 gap-4">
      {employees.items.map(employee => <PersonCard key={employee.id} person={employee} />)}
    </div>
  );
};
```

</small>

- `getEmployees` does an HTTP call under the hood — but from where this
  component sits, it's just an `async` function it awaits, same as reading a
  file was in module 04.
- Because this runs on the server (module 04, again), the HTML that reaches
  the browser already has the employees in it. No spinner, no second render.
- No `'use client'` needed anywhere here — fetching data doesn't require the
  browser. It only needs *something* that can run `await`.

Notes:

This is the "click" moment for the module: the mental model from module 04 (Server Components can do server-only work directly) already fully explains this. There's no new React concept here, only a new data source.
