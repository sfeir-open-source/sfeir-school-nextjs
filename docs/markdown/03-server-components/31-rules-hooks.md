<!-- .slide: class="two-column with-code title-margin-sm" -->

# Constraints

As soon as a component needs to use **hooks** or **contexts**, it must become a client-component

Why ? Because this means it will be re-rendered
**A server-component can never be re-rendered**

##--##

<br/> <br/>

```jsx [1]
"use client"

import { useState, useEffect } from 'react';

const Timer = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => )
  });

  return <span>Seconds : {count}</span>
}
```
