<!-- .slide: class="two-column with-code " -->

# Conventions

## Defining a server action

**Server actions can be defined in separate modules :**

```js
// actions.ts
'use server';

const createUser = () => {
  // Mutations & server operations
};
```

'use server' has to be specified at the top level

**Or directly in a server component with an inline function :**

```jsx
// MyComponent.tsx
const MyComponent = () => {
  async function createUser() {
    'use server';
    // Mutations & server operations
  }
};
```
