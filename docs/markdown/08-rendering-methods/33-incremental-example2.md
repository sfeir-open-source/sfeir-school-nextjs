<!-- .slide: class="two-column with-code " -->

# Rendering methods

## Incremental Static Rendering (ISR)

**Examples**

Catch-all dynamic segment

```js
// /app/employee/[...params]/page.tsx
export const generateStaticParams = () => {
  return [{ params: ['a', '1'] }, { params: ['b', '2'] }, { params: ['c', '3'] }];
};

// Will generate :
// - /employee/a/1
// - /employee/b/2
// - /employee/c/3
```

##--##

<br/> <br/>

<div>

Parent / Children page segments :

```js
// /app/employee/[category]/page.tsx
export const generateStaticParams = () => {
  return [{ category: 'a' }, { category: 'b' }, { category: 'c' }];
};
```

```js
// /app/employee/[category]/[id]/page.tsx
export const generateStaticParams = async ({ params: { category } }) => {
  const employees = await getEmployees(category);
  return employees.map((employee) => ({ id: employee.id }));
};
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
