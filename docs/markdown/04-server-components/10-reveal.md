<!-- .slide: class="with-code" -->

# Wait — where did that code just run?

Look again at the employee detail page from the last lab. Nothing about it
looks unusual:

```tsx
// app/(dashboard)/employees/[id]/page.tsx
const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = employeesData.find(employee => employee.id === params.id);

  return <PersonCard person={employee} />;
};
```

<div>

- No `useState`, no `useEffect`, no `fetch` firing after the page shows up, no
  loading spinner while the data arrives.
- View Source on `/employees/1` and the employee's name is already sitting
  there in the HTML — nothing injected it after the fact.
- Every component you've written since module 02 — `PersonCard`, `PageTitle`,
  every `page.tsx` and `layout.tsx` — has been running somewhere you've never
  had to think about: **the server**, not the browser.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

The reveal moment — ask the room "where do you think this component's code executes?" before clicking to the last bullet. Most will say the browser, because that's the assumption every other React tutorial builds. Let the surprise land before moving on; this is the single biggest mental shift in the course.
