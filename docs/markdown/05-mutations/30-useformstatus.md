<!-- .slide: class="two-column with-code " -->

# Utility hooks

## useFormStatus

Used in a child of a form element, gives information about the last form submission :

```jsx
import { useFormStatus } from 'react-dom';
import createUser from './actions';

const SubmitButton = () => {
  const { pending, data, method, action } = useFormStatus();
  return (
    <>
      <button disabled={pending} type="submit">
        Submit
      </button>
      {pending && !!data && <span>Creating user {data.get('username')}</span>}
    </>
  );
};

const FormComponent = () => {
  return (
    <form action={createUser}>
      <input type="text" name="username" />
      <SubmitButton />
    </form>
  );
};
```
