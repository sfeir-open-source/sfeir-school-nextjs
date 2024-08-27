# Arguments - using action invocation

It's possible to passe arguments to server action :

```jsx
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

```jsx
//actions.ts
'use server';
export const createUser = async (username, email) => {
  // Mutations & server operations
};
```

_this arguments have to be serializable_
