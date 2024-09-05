<!-- .slide: class="two-column with-code " -->

# Navigating

## The `useRouter` hook

**Methods** :

- router.push
- router.replace
- router.back
- router.forward
- router.refresh
- router.prefetch

##--##

<br/>
<br/>
<br/>

Example :

```jsx
'use client';

import { useRouter } from 'next/navigation';

const Component = ({ employeeId, employeeName }) => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/dashboard');
    }, 5000);
  }, []);

  return <p>You will be redirected in 5 seconds</p>;
};
```

Notes:

Si on ne peut pas utiliser de Link, ou qu'on souhaite interagir directement avec le router de manière programmatique

On peut accéder à l'instance du router et utiliser ses méthodes
