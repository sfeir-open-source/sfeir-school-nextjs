<!-- .slide: class="two-column with-code" -->

# Data cache

## Revalidating : time based (TTL)

```jsx
export default function Page({ params }) {
  const employee = await fetch(`https://.../${params.id}`, { next: { revalidate: 3600 } }).then((res) => res.json());
  return <EmployeeDetails employee={employee} />
}
```
