<!-- .slide: class="two-column with-code " -->

# Navigating

## Getting navigation state (on the server)

**using page props, only in Page components (page.tsx) :**

**⚠️ Since Next 15, you must await params and searchParams**

```jsx
const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>,
  searchParams: Promise<{ query: string, page: string, sort: string, filter: string }>,
}) => {
  const { id } = await params;
  const { query, page, sort, filter } = await searchParams;

  return <EmployeesList currentEmployee={id} search={query} page={page} sort={sort} filter={filter} />;
};
```

Notes:

Du côté serveur, on expliquera un peu plus tard ce que ça implique

Mais on peut récupérer :

- les paramètres dynamiques d'URL
- les query params

Uniquement dans les pages

Donc il faudra le faire descendre si on en a besoin plus loin dans la hiérarchie de composants
