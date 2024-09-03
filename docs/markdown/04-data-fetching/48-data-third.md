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

**What if I'm not using fetch ?** -> You can use **unstable_cache** method from Next.js :

```jsx
// In a server component, use unstable_cache to wrap the third party code :
import { unstable_cache } from 'next/cache';

import apolloClient from '@/apollo';
import { GET_PRODUCTS } from '@/queries';

const getEmployees = unstable_cache(
  async () => {
    const response = await apolloClient.query({ query: GET_EMPLOYEES });
    return response.data;
  },
  ['employees'], // unique key to help Next storing unique cache objects
  {
    tags: ['employees'],
    revalidate: 3600,
  }
);

export default function Page() {
  const employee = await getEmployees();
  return <EmployeeList employees={employees} />
}
```

##--##

<br/> <br/> <br/> <br/> <br/>

```js
// Then revalidate the tag on a route handler or server action :
import { revalidateTag } from 'next/cache';

revalidateTag('employees');
```
