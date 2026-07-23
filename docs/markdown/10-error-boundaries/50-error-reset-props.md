<!-- .slide: class="with-code" -->

# Two props, and only two: `error` and `reset`

Next.js calls the `error.tsx` component itself — you never render it by
hand — and always passes it the same two props:

```tsx
'use client';

const ErrorPage = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => (
  <div>
    <h2>Something went wrong!</h2>
    <button onClick={() => reset()}>Try again</button>
  </div>
);
```

- **`error`**: the `Error` that was thrown. In development its real
  `message` is forwarded, useful for debugging. In production, an error
  thrown from a *Server* Component is replaced with a generic message —
  `error.digest` is what's left, an id you can match against your server
  logs, so nothing sensitive leaks to the browser.
- **`reset`**: a function that re-renders the boundary's children without a
  full page reload — call it from a "Try again" button to give the failure
  a second chance, useful when the cause was temporary (a flaky request, a
  backend that just came back up).
- Neither prop is required reading today — the app's own `error.tsx` files
  ignore both and just show a fixed message, which is a perfectly valid
  `error.tsx`. They're worth knowing exist for when a boundary needs to be
  smarter than that.

Notes:

Don't over-promise what reset does — it re-renders, it doesn't guarantee a fresh fetch happened underneath. Keep this factual and move on; the lab's error.tsx files stay deliberately simple.
