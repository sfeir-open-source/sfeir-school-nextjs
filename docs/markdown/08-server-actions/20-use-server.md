<!-- .slide: class="with-code" -->

# `'use server'`: a normal function, called over the network

One line at the top of a function tells Next.js "this runs on the server,
but the browser is allowed to call it":

```tsx
// app/(dashboard)/employees/action.ts
'use server';

import { postEmployee, putEmployee } from '@/app/providers/employees';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export const createEmployee = async (form: FormData) => {
  // ...
};
```

- You write `createEmployee` like any other `async` function. Next.js does
  the unglamorous part: when a browser calls it, that call quietly becomes a
  network request, the function runs on the server, and the result comes
  back — no `fetch`, no Route Handler, no URL you have to invent.
- React's official name for this is a **Server Function** — an `async`
  function marked with `'use server'`, either at the top of the file (every
  export in it) or at the top of one function.
- Same family as `'use client'` from module 04: a directive, not an
  import — it changes how the compiler treats the code below it, it isn't a
  value you call.

Notes:

Keep hammering the framing: "you write a normal function, Next.js does the network plumbing for you." That's the whole trick, and it directly mirrors module 06's "await, that's the whole trick" moment for reads — this is the same relief, for writes.
