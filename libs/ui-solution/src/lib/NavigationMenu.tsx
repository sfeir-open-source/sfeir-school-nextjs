import { Suspense } from 'react';
import { NavigationItem } from './NavigationItem';

const items = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/employees',
    label: 'Employees',
  },
  {
    href: '/expenses',
    label: 'Expenses',
  },
];

const NavigationItemsFallback = () => (
  <>
    {items.map(item => (
      <li key={item.href}>
        <a className="block px-4 py-2 rounded-md" href={item.href}>
          {item.label}
        </a>
      </li>
    ))}
  </>
);

export const NavigationMenu = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <Suspense fallback={<NavigationItemsFallback />}>
          {items.map(item => (
            <NavigationItem key={item.href} href={item.href}>
              {item.label}
            </NavigationItem>
          ))}
        </Suspense>
      </ul>
    </nav>
  );
};
