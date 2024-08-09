<!-- .slide: class="two-column with-code " -->

# Navigating

## Getting navigation state

**using next/navigation hooks :**

- usePathname
- useParams
- useSearchParams
- useSelectedLayoutSegment
- useSelectedLayoutSegments

##--##

<br/>
<br/>
<br/>

Example :

```jsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className={`link ${pathname === '/employees' ? 'active' : ''}`} href="/employees">
            Employees
          </Link>
        </li>
      </ul>
    </nav>
  );
}
```
