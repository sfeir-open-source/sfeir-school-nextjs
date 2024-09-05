<!-- .slide: class="two-column with-code " -->

# Navigating

## For server components ?

**using `redirect` function** :

```jsx
import { redirect } from 'next/navigation';
import SomeSecureComponent from './SomeSecureComponent';

const ServerComponent = ({ user }) => {
  if (!user.authenticated) redirect('/auth/login');
  return <SomeSecureComponent />;
};
```

##--##

Notes:

On parlera des server components juste après

Mais il faut savoir qu'on peut faire de la navigation côté serveur, grâce à la fonction redirect

L'avantage est que c'est pas une redirection client. C'est une vraie redirection serveur, avec le bon status code
