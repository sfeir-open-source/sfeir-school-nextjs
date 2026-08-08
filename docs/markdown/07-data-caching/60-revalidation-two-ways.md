<!-- .slide: class="with-code" -->

# Throwing the old photocopy away, two ways

A tag only says *which* photocopies to target. Something still has to
decide *when* to throw them away and make a new one — Next.js gives you two
triggers, and they're not mutually exclusive:

```tsx
import { cacheLife } from 'next/cache';

export async function getEmployees(search?: string) {
  'use cache';
  cacheLife('hours'); // ← time-based: refresh on its own, every so often
  cacheTag('all-employees');
  // ...
}
```

- **Time-based, with `cacheLife`:** pick a profile (`'minutes'`, `'hours'`,
  `'days'`, ...) and Next.js refreshes the photocopy on that schedule,
  automatically — no one has to remember to ask.
- **On-demand, with `revalidateTag`:** *you* say the word, right when you
  know a specific photocopy just became wrong — usually right after a
  mutation. That's coming up in a couple of slides.
- Most real apps use both: a generous `cacheLife` as a safety net (data
  self-heals even if nobody calls the on-demand path), plus on-demand
  revalidation for "the moment I know it changed."

Notes:

Keep cacheLife genuinely brief — one sentence, one example, move on. On-demand revalidation is where the interesting story is, because it maps directly to something they'll actually wire up in the lab.
