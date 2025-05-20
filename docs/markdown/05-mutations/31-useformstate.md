<!-- .slide: class="two-column with-code " -->

# Utility hooks

## useActionState

Allows you to update state based on the result of a form action :

```jsx
import { useActionState } from 'react';

async function addQuantity(previousState, formData) {
  return previousState + 1;
}

function AddQuantity({ initialCount }) {
  const [count, formAction] = useActionState(addQuantity, initialCount);
  return (
    <form>
      You have {count} items in your cart
      <button formAction={formAction}>Add quantity</button>
    </form>
  );
}
```
