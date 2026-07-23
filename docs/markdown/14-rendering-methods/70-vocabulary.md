<!-- .slide: class="with-code" -->

# Words you'll meet in the wild: SSR, SSG, ISR

Older Next.js material, blog posts, and job descriptions still talk about
picking **one** rendering strategy for an entire page. Worth knowing the
words — they map cleanly onto what's already on screen today:

- **SSG — Static Site Generation.** A page built once, ahead of time, same
  HTML for every visitor. That's the sidebar, the layout chrome — and, with
  `generateStaticParams`, every `/employees/<id>` this app knows about.
- **SSR — Server-Side Rendering.** A page computed fresh, on the server, for
  every single request. That's `@employeesSlot`'s `connection()`-forced
  "latest employees" widget from earlier — always live, never a photocopy.
- **ISR — Incremental Static Regeneration.** Built once, then refreshed —
  on a timer or on demand. That's exactly `cacheLife` and `revalidateTag`
  from module 07, just usually described back then as "caching data"
  rather than "regenerating a page."
- The difference in Next.js 16: those three used to be a choice you made
  **per page**. `cacheComponents` makes it a choice you make **per
  component** — a single page can be SSG in one spot, ISR in another, and
  SSR in a third, which is precisely what today's `employees/[id]` page
  already is.

Notes:

Keep this brief and reassuring, not a new syllabus — the goal is "you'll survive reading a five-year-old blog post," not "learn three more frameworks." If someone already knows SSR/SSG/ISR from elsewhere, this is the slide where it clicks that nothing contradicts what they learned, it's just more granular now.
