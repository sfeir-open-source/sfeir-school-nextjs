# 02.02 - Navigation

## Running the lab

```
npm run start -w 02.02
```

## Instructions

**1. next/link component**

- Update the navigation menu to use client-side navigation
- On the employees list view, add two links per card to access the **details** page or the **edit** page

**2. Programmatic navigation**

- Modify the ExpensesTable component to navigate to the expense detail on click

**3. Navigation state**

- Implement a "Search" component : Update the URL to add the search as a query parameter
- Update the employees list to filter depending on the user search

## Information

For the search component, you can use `TextField` component from `/src/components`, or the `<input />` element directly (styling is not important).
