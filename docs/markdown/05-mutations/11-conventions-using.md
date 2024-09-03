<!-- .slide: class="two-column with-code " -->

# Server actions

## How to call it ?

Simply import it and use it as a regular function <br/>

```js
// MyComponent.tsx (can be client or server component)
import { createUser } from './actions';

const MyComponent = () => {
  return <form onSubmit={createUser}>...</form>;
};
```

<br/>

_Note : this function is asynchronous_
