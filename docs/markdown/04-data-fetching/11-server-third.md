<!-- .slide: class="two-column with-code " -->

# Fetching from the server

## third party libraries

Allows to use third parties libraries :

```jsx [1-5]
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
