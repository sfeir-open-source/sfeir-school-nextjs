<!-- .slide: class="two-column with-code " -->

# Fetching from the server

## parallel fetching patterns

A good practice is to always parallelize calls that are not dependent :

```jsx [3-5]
import { BASE_URL } from './api';

const HomePage = async () => {
  const employees = await fetch(`${BASE_URL}/api/employees`).then((res) => res.json());
  const expenses = await fetch(`${BASE_URL}/api/expenses`).then((res) => res.json());

  return (
    <>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
      <ExpensesList expenses={expenses} />
    </>
  );
};
```

##--##

<br/> <br/> <br/> <br/> <br/>

```jsx [3-10]
import { BASE_URL } from './api';

const HomePage = async () => {
  const [employeesResponse, expensesResponse] = await Promise.allSettled([
    fetch(`${BASE_URL}/api/employees`),
    fetch(`${BASE_URL}/api/expenses`),
  ]);

  const employees = employeesResponse.status === 'fulfilled' ? await employeesResponse.value.json() : [];
  const expenses = expensesResponse.status === 'fulfilled' ? await expensesResponse.value.json() : [];

  return (
    <>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
      <ExpensesList expenses={expenses} />
    </>
  );
};
```
