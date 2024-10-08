<!-- .slide: class="two-column with-code " -->

<style>
  .parallel-routing-schema-img {
    width: 400px;
    height: auto;
  }
  </style>

# Routing

## Parallel routing

Parallel Routes allows to simultaneously render multiple pages within the same layout :

<img src="./assets/images/02-routing/parallel-routing-schema.png" class="parallel-routing-schema-img" />

##--##

<br/>

<br/>

app/dashboard/layout.tsx :

```tsx
type LayoutProps = {
  children: React.ReactNode;
  settings: React.ReactNode;
  employees: React.ReactNode;
};

const Layout = ({ children, settings, employees }) => {
  return (
    <main>
      <div>{employees}</div>
      {children}
      <div>{settings}</div>
    </main>
  );
};
```

Notes:

Utile quand on a une page composée de plusieurs parties indépendantes

Inconvénient : difficile de faire communiquer les parties entre elles (partager les données de l'une à l'autre)
