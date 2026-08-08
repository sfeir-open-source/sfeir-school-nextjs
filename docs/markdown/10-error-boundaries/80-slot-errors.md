<!-- .slide: class="with-code" -->

# Each slot gets its own `error.tsx`

Because a slot renders like its own mini route, it can hold every file
convention a route can — including `error.tsx`. Drop one inside
`@expensesSlot`, and a crash there stops at the slot's edge:

<small>

```tsx
// app/(dashboard)/(home)/@expensesSlot/error.tsx
'use client';

import { Alert } from '@sfeir/ui-solution/server';

const ExpensesSlotError = () => (
  <Alert>
    <span className="font-bold">Oops !</span> Something went wrong trying to fetch latest expenses :/
  </Alert>
);

export default ExpensesSlotError;
```

</small>

<div>

- `@employeesSlot` gets the same treatment, with its own message. Neither
  one imports or knows about the other's `error.tsx` — the failure is fully
  contained to the slot it happened in.
- The payoff: stop the `server` app and reload `/`. Both widgets fail — but
  each catches its own crash and shows its own small red `Alert`, instead of
  one thrown error nuking the whole page. The page title above and the
  sidebar on the left keep rendering exactly as usual, and neither slot's
  error takes the other slot down with it.
- Without these two files, that same double failure would bubble past both
  slots, past `(dashboard)/layout.tsx`, all the way to `app/error.tsx` —
  sidebar, page title, and both widgets alike replaced by the generic
  "service unavailable" screen from two slides ago.
- This is the "one broken widget shouldn't take down the whole dashboard"
  problem, actually solved — not with route nesting, but with `error.tsx` at
  the boundary each slot naturally gives you.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

If you can, demo this live right after the previous slide's parallel-routes explanation: kill the server, reload /, and let the room watch two small red alerts appear in place of the two widgets while the page title and sidebar stay put. Then remove one of the two error.tsx files and reload again to show the fallback jumping all the way up to app/error.tsx — that contrast is the entire point of the module.
