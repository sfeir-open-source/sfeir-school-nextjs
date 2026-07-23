<!-- .slide: class="with-code" -->

# `getEmployees` runs. Every single time.

`/employees` is a Server Component, so `getEmployees` runs on the server —
that part is settled since module 06. What's easy to miss: it runs **again**
on every visit, from every visitor, even when nothing changed:

```tsx
// app/providers/employees.ts — as it stands today
export async function getEmployees(search?: string) {
  const url = `${API_BASE_URL}/people${search ? `?search=${search}` : ''}`;
  return await fetchData<Paginated<Person>>(url, { headers });
  // ↳ a real HTTP round-trip to the Fastify server, on every render
}
```

- Ten people load `/employees` in the same minute → ten identical HTTP calls
  to `localhost:9000`, for the exact same list of employees.
- In this workshop that's a Fastify server reading a JSON file — harmless.
  In production it's a real database, and that database has a connection
  limit, a bill, and a breaking point.
- The data isn't even changing between those ten calls. Redoing the work
  ten times to get the same answer ten times is pure waste.

Notes:

Anchor this in something concrete: ask the room what happens to a database when 10,000 people hit the same product page in the same second, all triggering the same query. This module is the answer to that problem.
