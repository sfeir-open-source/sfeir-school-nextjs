<!-- .slide: class="two-column with-code title-margin-sm" -->

# Error management

exceptions must be handled in server actions rather than being thrown. <br/>
Instead, the error should be represented by the action's return value. <br/>

```jsx
'use server';

import { redirect } from 'next/navigation';

export async function createUser(state, formData) {
  const res = await fetch('https://...');
  const json = await res.json();

  if (!res.ok) {
    return { error: 'Oops, something wrong happened :/' };
  }

  redirect('/dashboard');
}
```

_This makes it possible to use useFormState correctly_
