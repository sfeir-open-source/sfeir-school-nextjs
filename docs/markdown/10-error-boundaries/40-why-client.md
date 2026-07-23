<!-- .slide: class="with-code" -->

# Why `error.tsx` always starts with `'use client'`

Run module 04's question on it: **does this need state, interactivity, or a
browser API?** An error boundary's whole job is to catch a failure *after*
the server has already given up — recovering from that has to happen in the
browser:

```tsx
'use client'; // Error boundaries must be Client Components

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};
```

- The `onClick` on that "Try again" button is exactly the kind of
  interactivity module 04's rule flags as a **yes** — no way to wire a click
  handler without shipping JS for it.
- Deeper reason: `error.tsx` is implemented with a
  [React error boundary](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary),
  a mechanism that only exists client-side — there's no server-rendering
  equivalent of "catch a crash and swap in different markup mid-render."
- The app's real `error.tsx` files (root, and the two you'll write in the
  lab) don't use `reset` yet — they're intentionally static. The next slide
  covers what it's for.

Notes:

This is a direct callback to the module 04 decision rule slide — say it out loud again if the room needs the reminder: "does this need state, interactivity, or a browser API." A retry button is the textbook yes.
