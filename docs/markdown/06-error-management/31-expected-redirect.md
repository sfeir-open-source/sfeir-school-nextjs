<!-- .slide: class="two-column with-code " -->

# 2. Expected errors

## In server components

It's also possible to redirect the user :

```jsx
import { redirect } from 'next/navigation';

export default async function Page() {
  const res = await getUsers().catch((err) => {
    console.error(err);
    return { error: true };
  });

  if (res.error) redirect('/dashboard');

  return <div>...</div>;
}
```
