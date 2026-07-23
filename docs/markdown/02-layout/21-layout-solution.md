<!-- .slide: class="tc-multiple-columns" -->

##++##

<style>
  .layout02-layout-img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }
</style>

# `layout.tsx`: shared UI around a page

Think of a `layout.tsx` as the **hallway** of a house. Every room (page) opens
off the same hallway — you don't rebuild its walls and lighting each time you
walk into a different room, it's just... there, persisting around you.

A layout is a component that accepts a `children` prop, and renders it
wherever the next page (or nested layout) should appear:

```tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>{/* logo, nav */}</header>
      <main>{children}</main>
    </div>
  );
}
```

##++##

##++##

<img src="./assets/images/02-layout/naming-layout.png" class="layout02-layout-img" />

Write it **once**, next to (or above) the pages it should wrap — Next.js takes
care of rendering it around every matching page automatically.

##++##

Notes:

Emphasize "accepts children" is the entire contract — no special API, no import from next/*, just a component recognized by its filename. Lean on the hallway analogy if anyone looks confused: rooms change, the hallway doesn't rebuild.
