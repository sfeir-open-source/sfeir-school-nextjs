<!-- .slide: class="two-column with-code " -->

# Streaming

## Suspense

You can also use React **\<Suspense /\>** API Directly :

```jsx
import { Suspense } from 'react';
import { Employees, Expenses } from './Components';

export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading employees...</p>}>
        <Employees />
      </Suspense>
      <Suspense fallback={<p>Loading expenses...</p>}>
        <Expenses />
      </Suspense>
    </section>
  );
}
```
