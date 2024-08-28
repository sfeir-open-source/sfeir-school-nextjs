<!-- .slide: class="two-column with-code " -->

# 1. Error boundaries

## Default Error

Convention : **/app/global-error.tsx** <br/>

- Default error must include its own HTML markup, because it's not nested in the root layout
- Error boundaries must be client component, because unexpected errors can happen on the server AND on the client

##--##

<br/> <br/>

```jsx
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <h2>Oops, Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
```
