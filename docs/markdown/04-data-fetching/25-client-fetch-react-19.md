<!-- .slide: class="two-column with-code " -->

# 3. Fetching from the client

**🆕 Using fetch API since React 19**

```js
const ServerComponent = ({ employeeId }: { employeeId: string }) => {
  const employee: Promise<Employee> = fetchEmployeeById(employeeId);

  return (
    <div>
      <h2>Employee {employeeId}</h2>
      <Suspense fallback={<p>Loading...</p>}>
        <ClientComponent employee={employee} />
      </Suspense>
    </div>
  );
};
```

##--##

```js
'use client';

import { use } from 'react';

const ClientComponent = ({ employee }: { employee: Promise<Employee> }) => {
  const employee = use(employee());

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
