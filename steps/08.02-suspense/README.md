# 08.01 - Suspense

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the solution

```
npm run dev -w 08.02
```

## Instructions

1. Streaming an entire page

   - The expense list page is long to load
   - Implement streaming to this page to optimise loading

2. Streaming and parallel routing

   - Add a loading state for homepage components

3. Streaming only a part of a page
   - In the `ExpenseDetails` component, the `ExpenseEmployee` component is blocking : it must be loaded for the page to be rendered
   - Add a loading state only to this part of the page

## Informations

Styling is not important, but you can use this utility components to display loading states :

- Skeleton
- TableLoading
