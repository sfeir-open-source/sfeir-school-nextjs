<!-- .slide: class="two-column with-code" -->

<style>
  .template-schema-img {
    width: 400px;
    height: auto;
    display: block;
    margin-top: 30px!important;
  }
</style>

# Routing

## Templates

Templates are layouts, but when navigating :

- Their children re-render
- Their state is reset

<img src="./assets/images/02-routing/template-schema.png" class="template-schema-img" />

##--##

<br/> 
<br/>
<br/>

```jsx
import { useState, useEffect } from 'react';

const Wrapper = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => setCount((c) => c + 1), 1000);
  }, []);

  return (
    <div>
      <p>Elapsed seconds : {count}</p>
      {children}
    </div>
  );
};
```

<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Layouts un peu particuliers : les templates

Ce sont des layouts, mais qui sont re-render d'une page à l'autre

Utile pour des besoins spécifiques. Par exemple pour du tracking (Redéclencher un pageView à chaque navigation)

(Equivalent de mettre un key={pathname} sur un layout)
