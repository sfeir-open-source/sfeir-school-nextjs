<!-- .slide: class="two-column with-code" -->

# Caching

## 1/4 Request memoization

**What if I'm not using fetch ?**<br/>
You can use React cache function to memoize functions :

```jsx [1, 6-9, 13, 21]
import { cache } from 'react';

import apolloClient from '@/apollo';
import { GET_PRODUCTS } from '@/queries';

const findEmployee = cache(async (id) => {
  const response = await apolloClient.query({ query: GET_EMPLOYEE, variables: { id } }).then((res) => res.data);
  return response.data;
})

export async function generateMetadata({ params }) {
  const id = params.id
  const employee = await findEmployee(id);

  return {
    title: employee.fullname,
  }
}

export default function Page({ params }) {
  const employee = await findEmployee(params.id);
  return <EmployeeDetails employee={employee} />
}
```
