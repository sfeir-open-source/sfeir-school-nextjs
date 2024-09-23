<!-- .slide: class="two-column with-code " -->

# Server Components

## Client vs Server component

"Client components" are just regular components

<br/>

<img src="./assets/images/03-server-components/client-vs-server-3.png" style="width: 700px; height: auto;"/>

##--##

<br/>

<div>

In Next.js, all components are now Server Components by default <br/>
<br/> <br/>
To declare a client component, add the "use client" directive

```jsx
"use client"

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

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->