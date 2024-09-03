<!-- .slide: class="two-column with-code" -->

<style>
  .layout-schema-img {
    width: 500px;
    height: auto;
  }
</style>

# Routing

## Shared layouts

Layouts can be used to define a UI that is shared between several sub-segments.

When navigating, layouts are **not re-rendered**, they **preserve their state** and remain **interactive**.

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
