# 05.02 - Form hooks

## Prerequisites

Running the API server :

```
npm run start -w api
```

## Running the lab

```
npm run dev -w 05.02
```

## Instructions

1. Take a look at the `<Button />` component : it has a `loading` prop

   - Create a `SubmitFormButton` component
   - Use the appropriate hook to get the loading status
   - Display a loading state if the action is pending

2. Take a look at the API response if you submit invalid data (missing field or format error)
   - In the `EmployeeForm`, use the appropriate hook to get the form state
   - Pass the form validation errors to `TextFields` components
