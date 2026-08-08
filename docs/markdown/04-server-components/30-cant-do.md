<!-- .slide: class="with-code" -->

# So what's the catch?

A Server Component's code never reaches the browser — which means it never
runs in one either. There's no browser tab executing this code, so anything
that needs one simply has nowhere to happen:

```tsx
// This is a Server Component. This does not work.
const Search = () => {
  const [value, setValue] = useState(''); // ❌
  return <input onChange={e => setValue(e.target.value)} />; // ❌
};
```

<div>

- **No `useState` / `useReducer`** — there's no component instance sitting in
  a browser tab to hold that state between renders.
- **No `useEffect` or event handlers** — `onClick`, `onChange`... nothing to
  attach them to, nothing to fire them.
- **No browser-only APIs** — `window`, `localStorage`, `navigator.geolocation`
  don't exist on a server.
- Try it anyway, and Next.js stops the build with an error like: *"You're
  importing a component that needs `useState`. It only works in a Client
  Component but none of its parents are marked with `"use client"`, so
  they're Server Components by default."*

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Read the real error message out loud if you have the app open — it's unusually clear as Next.js errors go, and names the fix directly. This naturally sets up the next slide.
