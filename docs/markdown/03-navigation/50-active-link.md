<!-- .slide: class="with-code" -->

# A pattern you'll see: highlighting where you are

Look closely at the sidebar in the finished app, and the current page's link
sits on a slightly darker background — a small but common navigation touch:

```tsx
const isActive = pathname === href;

<Link href={href} className={clsx('block px-4 py-2 rounded-md', isActive && 'bg-gray-100')}>
  {children}
</Link>;
```

- It compares the current URL to each link's `href`, and adds a class when
  they match — nothing more magical than that.
- Reading "the current URL" from inside a component needs a hook
  (`usePathname`) and a small extra rule about that particular component,
  which is exactly what module 04 unpacks.
- For now, just recognize the pattern when you see it in the sidebar — you'll
  have the full picture on **why** it's written this way very soon.

Notes:

Deliberately underexplained — resist the urge to define Server vs Client Components here even if asked directly, just say "great question, that's next module" and move on. The goal is pattern recognition, not mechanism, at this point in the course.
