<!-- .slide: class="two-column with-code " -->

# Rendering methods

## Server-Side Rendering

Next.js : Page router

```jsx
// This code only runs on the server:
export async function getServerSideProps({ req }) {
  const employee = await fetch(`/api/employees/${req.params.id}`).then((res) => res.json());
  return {
    props: { employee },
  };
}
// This code runs on the server + on the client
export default function EmployeePage({ employee }) {
  return (
    <>
      <img src={employee.picture} alt={`Picture of ${employee.firstname} ${employee.lastname}`} />
      <h1>
        {employee.firstname} {employee.lastname}
      </h1>
      <span>{employee.position}</span>
    </>
  );
}
```
