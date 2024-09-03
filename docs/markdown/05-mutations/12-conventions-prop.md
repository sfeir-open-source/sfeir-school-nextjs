<!-- .slide: class="two-column with-code " -->

# Server actions

## Passing as a prop

You can also pass a Server Action as a prop : <br/>

```jsx
const ServerComponent = () => {
  async function createUser() {
    'use server';
    // Mutations & server operations
  }

  return <ClientComponent createUserAction={createUser} />;
};
```

_Useful for passing server actions from server components to client components_
