<!-- .slide: class="two-column with-code title-margin-sm" -->

<style>
  .template-schema-img {
    width: 400px;
    height: auto;
    display: block;
    margin-top: 30px!important;
  }
</style>

# Templates

Templates are layouts, but when navigating :

- Their children are re-render
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
