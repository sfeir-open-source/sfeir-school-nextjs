<!-- .slide: class="two-column with-code " -->

# Navigating

## Getting navigation state (on the server)

**using page props, only in Page components (page.tsx) :**

```jsx
const Page = ({ params, searchParams }) => {
  return (
    <EmployeesList
      currentEmployee={params.id}
      search={searchParams.query}
      page={searchParams.page}
      sort={searchParams.sort}
      filter={searchParams.filter}
    />
  );
};
```

Notes:

Du côté serveur, on expliquera un peu plus tard ce que ça implique

Mais on peut récupérer :

- les paramètres dynamiques d'URL
- les query params

Uniquement dans les pages

Donc il faudra le faire descendre si on en a besoin plus loin dans la hiérarchie de composants
