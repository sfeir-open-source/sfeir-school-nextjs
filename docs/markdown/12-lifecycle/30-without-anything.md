<!-- .slide: class="with-code" -->

# Without help, the slowest fetch sets the pace for everyone

Next.js's own docs say it plainly: *"if you have any slow data requests, the
whole route will be blocked from rendering until all the data is fetched."*
Applied to the home page, that means:

- The sidebar, the page title, the already-cached `@employeesSlot` widget —
  all of it would sit finished and ready, but held back, because
  `@expensesSlot`'s `getExpenses` is still waiting on its network round-trip.
- One slow, uncached fetch anywhere in the tree is enough to make the entire
  page feel slow — even the parts that had nothing left to do.
- This is exactly why every data-fetching component in this app has been
  wrapped in `<Suspense>` since module 07's lab: `cacheComponents` refuses to
  let a page ship without one around any dynamic read, precisely to prevent
  this from happening by accident.

Notes:

This is the payoff for the "don't worry why yet" IOUs from modules 05 and 07 — say that explicitly, the room has been carrying this question for a while now. The quote is straight from nextjs.org/docs/app/getting-started/fetching-data, worth citing by name if asked where it comes from.
