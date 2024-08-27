<!-- .slide: class="two-column with-code " -->

# Navigating

## The `<Link />` component

**props** :

- href
- replace (boolean)
- scroll (boolean)
- prefetch (boolean)

##--##

<br/>
<br/>
<br/>

Example :

```jsx
import Link from 'next/link';

const Component = ({ employeeId, employeeName }) => {
  return (
    <Link href={`/employees/${employeeId}`} prefetch={false}>
      {employeeName}
    </Link>
  );
};
```
