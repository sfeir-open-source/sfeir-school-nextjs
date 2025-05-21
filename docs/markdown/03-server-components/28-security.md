<!-- .slide: class="two-column with-code " -->

# Server Components

## Security & Data fetching

- Allows to fetch data
- Hides sensitive data from the client-side

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

Notes:

Avantage : sécurité

Permet de s'assurer que du code est joué uniquement sur le serveur, et qu'il ne sera jamais envoyé au client

Permet également l'utilisation de async, donc permet les taches asynchrones comme le chargement de donnée
