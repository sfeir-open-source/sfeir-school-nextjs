# 06.02 - Expected Errors | Solution

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the lab

```
npm run dev -w 08.01
```

## Instructions

1. Opt out static rendering on homepage

   - The page should be rendered on every request
   - The page should fetch its data on every request

2. Implement Incremental Static Regeneration for employees

   - Pre-render employee details and edit pages at build time
   - Don't accept new employee requests at run-time

3. Implement Incremental Static Regeneration for expenses

   - Pre-render expenses details pages at build time
   - Render new expenses details pages at run-time

4. Bonus : <br/>
   Implement a `<NoSSR>{children}</NoSSR/>` component : that make sure its children are never rendered on the server

## Information

You can configure the Next.js logger to show some informations about the cache usage :

```js
module.exports = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};
```
