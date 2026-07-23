<!-- .slide: class="with-code" -->

# One boundary `error.tsx` can never catch: the root layout itself

`app/error.tsx` wraps `page.tsx` and every nested `layout.tsx` **below** it —
but nothing wraps `app/layout.tsx` itself. If the root layout throws, there's
no `error.tsx` left in the tree to catch it. `global-error.tsx` is the one
file convention built for exactly that case:

<small>

```tsx
// app/global-error.tsx
'use client'; // still a Client Component

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    // global-error must define its own <html> and <body>
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
```

</small>

- It only activates when the **root layout** throws — every other crash in
  this app still lands on the regular `app/error.tsx` from earlier slides.
  This app doesn't have one; it's a rare-enough case most projects never
  need it.
- When it *does* activate, it **replaces the entire root layout** — sidebar,
  providers, everything — which is why it must render its own `<html>` and
  `<body>` tags. Nothing from `app/layout.tsx` survives underneath it.
- Because it renders its own document, it does **not** inherit global
  styles, fonts, or the app's Tailwind classes — it's deliberately isolated,
  a last-resort fallback outside the app's normal styling pipeline.

Notes:

Easy slide to rush past because this app never needed one — say that plainly. The one thing worth landing: error.tsx skips its own segment's layout (module 10's nesting slide), and the root layout has no segment above it — global-error.tsx is the only way to catch a crash there. If asked "why doesn't it just reuse app/layout.tsx" — because the layout itself might be what's broken, so global-error.tsx can't depend on it rendering correctly.
