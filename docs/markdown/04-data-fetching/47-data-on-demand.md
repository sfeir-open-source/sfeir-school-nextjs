<!-- .slide: class="two-column with-code" -->

<style>
  .revalidate-45 {
   width: 1500px;
   height: auto;
   margin-top: 2rem!important;
  }


</style>

# Caching

## 2/4 Data cache

Revalidating : on demand from route handlers or server actions

1. Using route pathname :

```js
import { revalidatePath } from 'next/cache';

revalidatePath('/employees/1234');
revalidatePath('/employees/[id]/page', 'page');
```

##--##

<br/> <br/> <br/> <br/> <br/>

<div>

2. Using tags :

```jsx
// On a server component, tag a request using next options :
export default function Page() {
  const employees = await fetch(`https://.../all`, { next: { tags: ["employees"] } }).then((res) => res.json());
  return <EmployeeList employees={employees} />
}
```

```js
// Then revalidate this tag on a route handler or server action :
import { revalidateTag } from 'next/cache';

revalidateTag('employees');
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
