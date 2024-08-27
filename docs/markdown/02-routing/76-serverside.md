<!-- .slide: class="two-column with-code " -->

# Navigating

## Getting navigation state (on the server)

**using page props, only in Page components (page.tsx) :**

```jsx
const Page = ({ params, searchParams }) => {
  return (
    <EmployeesList
      currentEmployee={params.id}
      search={searchParams.query}
      page={searchParams.page}
      sort={searchParams.sort}
      filter={searchParams.filter}
    />
  );
};
```
