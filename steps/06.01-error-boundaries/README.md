# 06.01 - Error Boundaries

## Prerequisites

If running, stop the API Server

## Running the lab

```
npm run dev -w 06.01
```

## Instructions

1. Next error boundaries

   - Try to run the application without starting the API server : it's broken
   - Add a global error boundary to display a user-friendly maintenance page
   - Take a look at the home page files : it has parralel routing !
   - Implement error boundaries to the homepage for errors close to the problem

2. Now you can re-start the API Server :

```
npm run start -w api
```

3. Custom error boundary
   - Take a look at the expenses details page : the page is broken ! :o
   - Find the error cause
   - Implement a custom Error boundary using `react-error-boundary` to prevent the whole page to break

## Infomations

- Styling is not important but if you want, you can use the component `PageError` for a nice global error layout
- For smaller error boundaries, you also have the `Alert` component
