<!-- .slide: class="two-column with-code " -->

# 1. Fetching from the server

## using fetch

Data can be fetched into an asynchronous server component :

```jsx [4-5]
import { BASE_URL } from './api';

const Employees = async () => {
  const data = await fetch(`${BASE_URL}/api/employees`);
  const employees = await data.json();

  return (
    <>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </>
  );
};
```
