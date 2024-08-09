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
