<!-- .slide: class="two-column with-code " -->

# Fetching from the server

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
  const employees = await fetch(`${BASE_URL}/api/employees`).then((res) => res.json());
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
  const expenses = await fetch(`${BASE_URL}/api/expenses`).then((res) => res.json());
  return <ExpensesListUI expenses={expenses} />;
};
```
