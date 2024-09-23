<!-- .slide: class="two-column with-code" -->

<style>
  .layout-schema-img {
    width: 500px;
    height: auto;
  }
</style>

# Routing

## Shared layouts

Layouts can be used to define a UI that is shared between multiple sub-segments

When navigating, layouts are **not re-rendered** and they **preserve their state**

<img src="./assets/images/02-routing/layout-schema.png" class="layout-schema-img" />

##--##

<br/> <br/>

```js
import Navigation from './Navigation.tsx';

type LayoutProps = {
  children: React.ReactNode,
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <div>{children}</div>
    </>
  );
};

export default Layout;
```

Notes:

Layouts : pour toute UI ou fonctionnalité partagée entre plusieurs pages

Pas de re-render d'une page à l'autre (partial rendering) : grosse plus value de la navigation côté client

Illustration avec un exemple
