# 05.01 - Server actions

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the lab

```
npm run dev -w 05.01
```

## Instructions

1. Mutations

   - Create a file that will contain server actions for employees
   - Implement a server action to create a new employee, and use it in `/employees/new`

2. Server Action
   - Make sure that the data is not stale after creating a new employee
   - Once the form is submitted, redirect to the new employee detail page

## Informations

- You don't have to implement the API methods, it's already implemented in `/src/api/people.tsx`
- You can colocate the actions file in `/src/app/(dashboard)/employees`
- If you have time, try to implement the `update` action (`/employees/:id/edit`)
