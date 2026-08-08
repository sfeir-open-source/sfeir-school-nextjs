<!-- .slide: class="with-code" -->

# It's not an import — it's a value

`'use client'` only restricts what a file **imports**. Passing something as
`children` (or any other prop) isn't an import — it's handing over a value.
And a value can be the already-rendered output of a Server Component:

> "This does not apply to Server Components passed as children or other
> props. Those components are not imported into the Client Component's
> module graph. They are rendered on the server and passed to the Client
> Component as rendered output." — [Next.js
> docs](https://nextjs.org/docs/app/getting-started/server-and-client-components),
> on the `'use client'` boundary

<div>

- A Server Component runs on the server **first**, turning itself into plain
  React elements — rendered markup, not source code.
- The Client Component that receives that as `children` never has to run the
  Server Component's code. It only ever handles the result: `{children}`,
  whatever it turns out to contain.
- `'use client'`'s boundary only ever "sees" the files its own module
  actually imports. Whatever gets slotted in through `children` was never one
  of them — so nothing crosses into the client bundle.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This is the slide to get precisely right: it's not that Server Components are "allowed as an exception" to the import rule — they were never being imported in the first place. children is just a prop, and a prop can be any value, including markup that happened to be produced by server-only code.
