<!-- .slide: class="two-column with-code " -->

# Server actions

## Arguments (using function invocation)

When calling it directly as a function, it's possible to pass arguments :

```jsx [7-9]
'use client';
import { createUser } from './actions';

const ClientComponent = () => {
  return (
    <button
      onClick={async () => {
        await createUser('Test', 'test@mail.com');
      }}
    >
      Submit
    </button>
  );
};
```

##--##

<br/> <br/> <br/> <br/> <br/> <br/>

```jsx
//actions.ts
'use server';
export const createUser = async (username, email) => {
  // Mutations & server operations
};
```

_this arguments must be serializable as JSON_
