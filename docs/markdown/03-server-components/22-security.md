<!-- .slide: class="two-column with-code " -->

# Server components

## Security & Data fetching

Allows heavy libraries to be loaded without increasing the weight of the client JavaScript

##--##

<br/> <br/>

EmployeesPage.tsx :

```jsx
import db from 'imaginary-db';

const EmployeesPage = async () => {
  const link = db.connect('localhost', 'root', 'passw0rd');
  const data = await db.query(link, 'SELECT * FROM employees');

  return (
    <>
      <h1>All Employees</h1>
      {employees.map((employee) => (
        <article key={employee.id}>
          <h2>
            {employee.firstname} {employee.lastname}
          </h2>
          <p>{employee.position}</p>
        </article>
      ))}
    </>
  );
};
export default EmployeesPage;
```
