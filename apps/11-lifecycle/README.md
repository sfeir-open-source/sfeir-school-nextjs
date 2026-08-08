# 11 - Lifecycle

## What you'll build

This app renders the SFEIR People dashboard through two parallel route
slots — `@employeesSlot` and `@expensesSlot` — that stream in at their own
pace. That part of the app is already built for you. Your job in this
exercise is to give `next.config.js` the ability to redirect and rewrite
requests **before any component even renders**: employee URLs get
shortened (`/employees/:id` → `/e_:id`) via a redirect+rewrite pair, a
stale `/expenses/variation` URL gets bounced back to `/expenses`, and a
cookie-gated rewrite swaps in an A/B variation of `/expenses` with zero
extra code.

## Concepts you'll practice

- **The request lifecycle**: request → (proxy, not today) → routing →
  Server Component render → streaming → hydration. `redirects()` and
  `rewrites()` both act at the routing step, before rendering starts.
  [Linking and Navigating / rendering lifecycle overview](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating)
- **Streaming with `<Suspense>`**: `@employeesSlot` and `@expensesSlot`
  resolve at different speeds and stream in independently — already wired
  up, yours to observe.
  [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- **`redirects()`**: tells the browser "go somewhere else" (a real HTTP
  redirect, the URL changes).
  [`redirects()`](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects)
- **`rewrites()`**: serves a different route's content while the URL stays
  the same — including a `has` condition that reads a cookie for a
  zero-code A/B test.
  [`rewrites()`](https://nextjs.org/docs/app/api-reference/config/next-config-js/rewrites)

## Steps

### 1. Watch the streaming actually happen

Open `/` with the browser's Network tab open (throttle to "Slow 3G" if you
can) and reload a few times. Watch `@employeesSlot`'s widget appear almost
immediately while `@expensesSlot` briefly shows its `Loading...` fallback
before the real table swaps in — same page, two different arrival times.
No code changes here, just observe how the two slots are declared:

```tsx
// src/app/(dashboard)/(home)/@expensesSlot/page.tsx
const ExpensesSlot = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ExpensesList />
  </Suspense>
);
```

### 2. Turn the fast slot into a slow one

- Open `src/app/providers/employees.ts` and look at `getEmployees`.
- Temporarily comment out the `'use cache'` directive and the
  `cacheTag('all-employees')` call right after it.
- Reload `/` a few times — `@employeesSlot` should now show its own
  `Loading...` flash too, every time, instead of resolving instantly.
- Once you've seen it, **restore both lines** so the file is back the way
  you found it before moving on.

```ts
// src/app/providers/employees.ts
export async function getEmployees(filter: Record<string, unknown>) {
  // BEFORE (cached, resolves instantly on repeat visits):
  'use cache';
  cacheTag('all-employees');

  // AFTER (temporarily commented out to observe streaming):
  // 'use cache';
  // cacheTag('all-employees');

  const stringQueryParams = buildQueryParamsToString(filter);
  // ...rest of the function is unchanged
}
```

### 3. Break a `<Suspense>` boundary on purpose

- Open `src/app/(dashboard)/(home)/@expensesSlot/page.tsx`.
- Temporarily remove the `<Suspense>` wrapper around `<ExpensesList />` and
  render `<ExpensesList />` directly.
- Reload `/` — with `cacheComponents: true` set in `next.config.js`,
  Next.js will refuse to render this and point you at the uncached
  `getExpenses` fetch that needs a `<Suspense>` boundary.
- Put the `<Suspense>` wrapper back once you've seen the error.

```tsx
// src/app/(dashboard)/(home)/@expensesSlot/page.tsx

// BEFORE (works, satisfies cacheComponents):
const ExpensesSlot = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ExpensesList />
  </Suspense>
);

// AFTER (temporarily removed to trigger the error — put it back!):
const ExpensesSlot = () => <ExpensesList />;
```

### 4. Add the missing redirects and rewrites

This is the real task: `next.config.js` in this app has no `redirects()`
or `rewrites()` yet — only `11-lifecycle-solution`'s does.

- Add an `async redirects()` function returning three entries, all with
  `permanent: false`:
  - `/expenses/variation` → `/expenses`
  - `/employees/:id` → `/e_:id`
  - `/employees/:id/edit` → `/e_:id/edit`
- Add an `async rewrites()` function returning an object with
  `beforeFiles`, `afterFiles: []`, and `fallback: []`. Populate
  `beforeFiles` with three entries:
  - `/e_:employeeId` → `/employees/:employeeId`
  - `/e_:employeeId/edit` → `/employees/:employeeId/edit`
  - `/expenses` → `/expenses/variation`, gated with
    `has: [{ type: 'cookie', key: 'abtest', value: 'true' }]`

Both functions live directly on `nextConfig` in `next.config.js`, next to
`distDir`/`cacheComponents`/`images`. Here's the shape, with one entry
fully worked in each — fill in the `// TODO`s using the same pattern:

```js
//@ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '../../dist/apps/11-lifecycle',
  cacheComponents: true,
  images: {
    remotePatterns: [new URL('https://randomuser.me/api/portraits/**')],
  },

  async redirects() {
    return [
      {
        source: '/expenses/variation',
        destination: '/expenses',
        permanent: false,
      },
      // TODO: add the /employees/:id → /e_:id redirect (permanent: false)
      // TODO: add the /employees/:id/edit → /e_:id/edit redirect (permanent: false)
    ];
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/e_:employeeId',
          destination: '/employees/:employeeId',
        },
        // TODO: add the /e_:employeeId/edit → /employees/:employeeId/edit rewrite
        // TODO: add the /expenses → /expenses/variation rewrite, gated with
        //       has: [{ type: 'cookie', key: 'abtest', value: 'true' }]
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

module.exports = nextConfig;
```

Restart the dev server — `next.config.js` changes are **not** hot-reloaded.
Then:

- Click into an employee from `/` and confirm the URL becomes `/e_<id>`
  while the real employee page still renders underneath.
- Add an `abtest=true` cookie on the app's origin (DevTools → Application →
  Cookies) and reload `/expenses` — the page's content should change even
  though the URL stays `/expenses`. Remove the cookie and reload to see it
  flip back.
- Visit `/expenses/variation` directly and confirm it bounces you back to
  `/expenses` instead of showing the variation on that URL.

### 5. Verify against the solution

Run `11-lifecycle-solution` alongside your app and compare `next.config.js`
— every other file in the two apps is identical on purpose, so this file
is the only diff worth checking.

## Running the exercise

```bash
npm run dev -- 11-lifecycle
```

This starts the `server` Fastify backend automatically (the `dev` target
depends on it) — you don't need to run it separately.

## Troubleshooting

- **`next.config.js` changes don't seem to take effect.** Unlike page/layout
  edits, config changes aren't hot-reloaded. Stop the dev server (`Ctrl+C`)
  and re-run `npm run dev -- 11-lifecycle`.
- **Redirect loops or a redirect that "does nothing".** Double-check
  `source`/`destination` aren't pointing at each other (e.g. redirecting
  `/employees/:id` to `/e_:id` while also rewriting `/e_:id` back to
  `/employees/:id` is intentional here — a real infinite loop happens if
  the destination of one entry matches the source of another in the wrong
  direction). Also confirm you didn't swap `source` and `destination`.
- **The `/e_<id>` URL 404s instead of showing the employee page.** Your
  `rewrites()` entry needs to live in `beforeFiles` (checked before
  Next.js tries to match a real page) — an `afterFiles`/`fallback` entry
  runs too late here since `/e_[id]` isn't a route that exists on disk.
- **The cookie-gated rewrite never fires.** Cookie matching in `has` is a
  strict equality check — confirm the cookie name is exactly `abtest`, the
  value is exactly the string `'true'`, and it's set on the same origin/port
  you're browsing (DevTools → Application → Cookies, not just `document.cookie`
  logged in the console).
- **Forgot to revert steps 2 or 3.** If `@employeesSlot` keeps flashing
  `Loading...` or the app throws on `/`, check that you put the `'use cache'`
  line back in `employees.ts` and the `<Suspense>` wrapper back around
  `<ExpensesList />`.
