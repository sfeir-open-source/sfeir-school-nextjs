# 06.02 - Expected errors

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the lab

```
npm run dev -w 06.02
```

## Instructions

1. Implement a global 404 page

   - This page should display the current invalid URL (example : the page "/invalid-page" does not exist)

2. Implement 404 pages for expense details, employee details & employee edition pages
   - This pages should display the current invalid id (example : the employee "1234" does not exist)

## Information

- For the global 404 page, you can re-use the PageError component, passing a different `code` as prop
- For the local 404 pages, you can use the `Alert` component to display a custom error message
