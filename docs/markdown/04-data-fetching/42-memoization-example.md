<!-- .slide: class="two-column with-code " -->

# Caching

## 1/4 Request memoization

Example :

```jsx
export async function generateMetadata({ params }) {
  const id = params.id
  const employee = await fetch(`https://.../${id}`).then((res) => res.json());

  return {
    title: employee.fullname,
  }
}

export default function Page({ params }) {
  const employee = await fetch(`https://.../${params.id}`).then((res) => res.json());
  return <EmployeeDetails employee={employee} />
}
```
