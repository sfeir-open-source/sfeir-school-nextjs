<!-- .slide: class="two-column with-code " -->

# 1. Fetching from the server

## parallel fetching patterns

But a better approach is to manage this in separate components :

<br/>

Homepage.tsx

```jsx
import EmployeesList from './EmployeesList';
import ExpensesList from './ExpensesList';

const Homepage = () => {
  return (
    <>
      <EmployeesList />
      <ExpensesList />
    </>
  );
};
```

##--##

EmployeesList.tsx

```jsx
import { BASE_URL } from './api';

const EmployeesList = async () => {
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

ExpensesList.tsx

```jsx
import { BASE_URL } from './api';

const ExpensesList = async () => {
  const data = await fetch(`${BASE_URL}/api/expenses`);
  const expenses = await data.json();

  return <ExpensesListUI expenses={expenses} />;
};
```
