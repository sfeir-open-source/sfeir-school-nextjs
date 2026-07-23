<!-- .slide: class="with-code" -->

# A list of employees, going nowhere

Thanks to the last module, `/employees` renders a card for every person in
`src/data/employee.json` — sitting inside the shared dashboard shell:

<small>

```tsx
// app/(dashboard)/employees/page.tsx
const Employees = async () => {
  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <div className="grid grid-cols-4 gap-4">
        {employeesData?.map(employee => (
          <PersonCard key={employee.id} person={employee} />
        ))}
      </div>
    </div>
  );
};
```

</small>

<div>

- Every card already has an `employee.id` sitting right there in the data.
- But nothing on the page points anywhere — there's no `/employees/42` route
  to send someone to, and no link to click even if there were.
- We need two things: a **page** that can render "one employee, chosen by
  id", and a way to **get there** from the list without losing everything
  Next.js already gives us for free.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Pull up 02-navigation's /employees route live if possible — click a card, nothing happens. That's the itch this module scratches. Two sub-problems, tackled one at a time: the route, then the link.
