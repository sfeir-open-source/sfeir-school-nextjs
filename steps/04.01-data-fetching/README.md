# 04.01 - Data fetching

## Prerequisites

Running the API server :

```
npm run start -w api
```

(From this point, you can leave the server running all day long)

## Running the lab

```
npm run dev -w 04.01
```

## Instructions

1. On the server :
   - Create utility functions to GET data from the API
   - Unmock the employees list page and use the API function
   - Unmock the employee single page and use the API function
2. On the client :
   - On the employee details page, there is a `<EmployeeExpenses />` component. It's displaying employee expenses on click, by making an asynchronous fetch request. Open it and find why it's not working
   - Create a route handler to make this component work

## Information

- If you have the time, you can unmock all the pages. But first, focus on employees
- You already have some utility functions you can use in `/src/api`
