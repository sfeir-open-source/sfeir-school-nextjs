<!-- .slide: class="with-code" -->

# The other payoff: highlighting where you are

Module 03 showed this exact snippet in the sidebar and promised the mechanism
was "coming soon." Here it is:

<small>

```tsx
// libs/ui-solution/src/lib/NavigationItem.tsx
'use client';

import { usePathname } from 'next/navigation';

export const NavigationItem = ({ href, children }: NavigationItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href} className={clsx('block px-4 py-2 rounded-md', isActive && 'bg-gray-100')}>
        {children}
      </Link>
    </li>
  );
};
```

</small>

- `usePathname` is a hook — same rule as `useState` or `useRouter`, it only
  works inside a Client Component.
- `NavigationMenu` itself stays a Server Component; only the individual
  `NavigationItem` that needs to read the current URL opts in.
- Same rule, same shape, two different features: the active link and the
  clickable row are both "one small `'use client'` leaf inside a server tree."

Notes:

Close the loop explicitly: "remember that sidebar highlight from module 03 we didn't explain? This is it." Reinforce that the decision rule from two slides ago is the whole trick, applied twice.
