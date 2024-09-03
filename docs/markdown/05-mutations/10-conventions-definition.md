<!-- .slide: class="two-column with-code " -->

# Server actions

## Conventions

**Server actions can be defined in separate modules :**

```js
// actions.ts
'use server';

const createUser = () => {
  // Mutations & server operations
};
```

'use server' has to be specified at the top level

<div>

**Or inlined in a server component body :**

```jsx
// MyComponent.tsx
const MyComponent = () => {
  async function createUser() {
    'use server';
    // Mutations & server operations
  }
};
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
