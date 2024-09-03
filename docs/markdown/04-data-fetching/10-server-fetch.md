<!-- .slide: class="two-column with-code " -->

# 1. Fetching from the server

## using fetch

Data can be fetched into an asynchronous server component :

```jsx [3-4]
import { BASE_URL } from './api';

const Employees = async () => {
  const data = await fetch(`${BASE_URL}/api/employees`).then((res) => res.json());

  return (
    <>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </>
  );
};
```
