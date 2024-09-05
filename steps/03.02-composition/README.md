# 03.02 - Server Components - Composition

## Running the lab

```
npm run start -w 03.02
```

## Instructions

1. Client to Server conversion : The `ExpensesTable` is a client component : it can be optimized
   - Delete the `use client` directive and analyze the error
   - Find a way to make this component interactive while keeping the majority on the server side
2. Dark theme is working, but not completly. Some components needs to dynamically get the theme value
   - Create a `ThemeProvider` component which will share the user's theme preference in a context
   - Subscribe to this context to update the application logo

## Information

Get browser theme preference :

```js
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Theme : Dark
}
```

Listen for browser theme preference changes :

```js
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (event.matches) {
    // Theme : Dark
  } else {
    // Theme : Light (default)
  }
});
```

## Documentation :

- [React : createContext](https://react.dev/reference/react/createContext)
