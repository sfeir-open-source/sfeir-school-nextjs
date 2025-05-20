<!-- .slide: class="two-column with-code " -->

# 3. Fetching from the client

**🆕 Using fetch API since React 19**

```js
'use client';

import { use } from 'react';

const MyComponent = ({ fetchEmployeeById }: { fetchEmployeeById: () => Promise<Employee> }) => {
  const employee = use(fetchEmployeeById());

  return (
    <div>
      <h2>
        {employee.firstname} {employee.lastname}
      </h2>
      <p>{employee.position}</p>
    </div>
  );
};
```

Note : The loading state can be handled by using the `Suspense` component.
