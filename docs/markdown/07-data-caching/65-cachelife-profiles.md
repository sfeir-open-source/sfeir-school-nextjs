<!-- .slide: class="with-code" -->

# Choosing (and customizing) a `cacheLife` profile

Six built-in profiles ship with Next.js, named for how often the underlying
data actually changes, not how urgently you'd like it fresh:
[`seconds`, `minutes`, `hours`, `days`, `weeks`, `max`](https://nextjs.org/docs/app/api-reference/functions/cacheLife#preset-cache-profiles)
(plus `default`, used automatically when no profile is picked).

- Each profile is really three numbers under the hood: `stale` (how long the
  client reuses it without asking), `revalidate` (how often the server
  quietly refreshes it in the background), `expire` (the hard ceiling before
  a request has to wait for a fresh copy). The presets are just sane
  defaults for those three.
- None of the presets fit? Define a named profile in `next.config.js`'s
  `cacheLife` object, then call it exactly like a built-in one:

```js
// next.config.js
const nextConfig = {
  cacheComponents: true,
  cacheLife: {
    payday: {
      stale: 60 * 60, // 1 hour
      revalidate: 60 * 60 * 24, // 1 day
      expire: 60 * 60 * 24 * 7, // 1 week
    },
  },
};
```

```tsx
cacheLife('payday'); // same call site as cacheLife('hours')
```

- `getEmployees` today would reasonably reach for `'hours'` — headcount
  changes a few times a day, not every second. A custom `payday` profile
  would make sense if HR only re-syncs it once a day around payroll.

Notes:

Keep the three numbers (stale/revalidate/expire) light — one sentence each is plenty for this level, the goal is "profiles are just named bundles of these three knobs," not a full mental model of prerendering thresholds. If someone asks which preset this app actually uses, be honest that the lab doesn't call cacheLife() at all yet — every cache uses the implicit default profile, and this slide is about the vocabulary for when they later choose one deliberately.
