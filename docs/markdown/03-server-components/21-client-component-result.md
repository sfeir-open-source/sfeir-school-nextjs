<!-- .slide: class="two-column with-code " -->

# Server Components

## Client vs Server component

Server components are neither a replacement nor an evolution of current components

<br/>

<img src="./assets/images/03-server-components/client-vs-server-1.png" style="width: 700px; height: auto;"/>

##--##

<div>

This component ...

```jsx
// IncrementButton.tsx
import { useState } from 'react';

export const IncrementButton: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Count: {count}
    </button>
  );
};
```

... produces JavaScript :


```js
// main.js
'use strict';
...
const IncrementButton = () => {
  const [count, setCount] = useState(0);
  return React.createElement('button', { onClick: () => setCount((c) => c + 1) }, 'Count: ', count);
};
...
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
