<!-- .slide: class="two-column with-code " -->

# Conventions

## Using a server action

Simply import it and use it as a regular function <br/>
_Note : this function is asynchronous_

```js
// MyComponent.tsx (can be client or server component)
import { createUser } from './actions';

const MyComponent = () => {
  return <form onSubmit={createUser}>...</form>;
};
```
