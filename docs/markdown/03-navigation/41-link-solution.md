<!-- .slide: class="with-code" -->

# `<Link>`: same job, none of the pain

Swap the anchor tag for the `Link` component from `next/link`, and give it
the exact same `href`:

```tsx
import Link from 'next/link';

<Link href={`/employees/${employee.id}`}>View detail</Link>
```

- **No full reload** — Next.js intercepts the click and swaps only the
  content that changed, the same persisting-layout behavior you already saw
  between `/employees` and `/expenses`.
- **Prefetching** — as soon as a `<Link>` scrolls into view, Next.js quietly
  fetches what it points to in the background. By the time you click, the
  next page is often already sitting there waiting.
- Everything else about `Link` reads like an anchor tag — `href` is the only
  prop you need to get started.

Notes:

Prefetching detail: for a static route the whole thing is prefetched; for a dynamic one like our [id] page, Next.js is more conservative about what it prefetches — the next slide names the actual `prefetch` prop values, this one just establishes that Link is "smart" by default. Full depth (loading.tsx, streaming) is module 15's territory.
