<!-- .slide: class="with-code" -->

# Why would anyone want that? A/B testing, with zero extra code

`11-lifecycle-solution`'s `next.config.js` actually ships a third
`beforeFiles` entry — the interesting one, a rewrite that only fires for
*some* visitors:

```js
// next.config.js — the entry the last slide skipped
beforeFiles: [
  // ...the two /e_:employeeId entries...
  {
    source: '/expenses',
    has: [{ type: 'cookie', key: 'abtest', value: 'true' }],
    destination: '/expenses/variation',
  },
],
```

<div>

- Every visitor's browser requests the same URL, `/expenses`. Only the ones
  carrying an `abtest=true` cookie get silently served
  `/expenses/variation`'s page instead — a real route, `app/(dashboard)/
  expenses/variation/page.tsx`, that no link in this app ever points to on
  purpose.
- That's the whole trick of the redirect from two slides ago: a visitor who
  somehow lands on `/expenses/variation` directly gets bounced straight
  back to `/expenses` — so the *only* way to ever see that page's content
  is through this cookie-gated rewrite. `/expenses/variation` isn't a page
  anyone visits; it's a variant `/expenses` occasionally serves.
- This is a real, minimal A/B test: flip the `abtest` cookie for a slice of
  traffic (a proxy, an experimentation platform, even a manual
  `document.cookie` in devtools), and that slice silently sees the
  variation — no branching in `page.tsx`, no client-side flicker, decided
  entirely in configuration before a single Server Component renders.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

This `has: cookie` check is pure equality matching against a fixed value — no verification, no computation — which is exactly why it can live in next.config.js as data instead of code. Keep that phrase in your back pocket: next module's proxy.ts will read a cookie too, but to verify a signature, not just compare a string. That contrast is coming, not today's job.
