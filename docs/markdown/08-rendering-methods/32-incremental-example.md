<!-- .slide: class="two-column with-code " -->

# Rendering methods

## Incremental Static Rendering (ISR)

**Examples**

Single dynamic segment

```js
// /app/employee/[id]/page.tsx
export const generateStaticParams = () => {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
};

// Will generate :
// - /employee/1
// - /employee/2
// - /employee/3
```

##--##

<br/> <br/>

<div>

Multiple dynamic segment

```js
// /app/employee/[category]/[id]/page.tsx
export const generateStaticParams = () => {
  return [
    { id: '1', category: 'a' },
    { id: '2', category: 'b' },
    { id: '3', category: 'c' },
  ];
};

// Will generate :
// - /employee/a/1
// - /employee/b/2
// - /employee/c/3
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
