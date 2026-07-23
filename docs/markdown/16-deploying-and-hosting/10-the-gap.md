<!-- .slide: class="with-code" -->

# Everything so far has run on `localhost`

Fifteen modules of `npm run dev -- <app>`, `http://localhost:3000`, one
browser tab, one visitor: you. That's a real Next.js app underneath — the
same App Router, the same Server Components, the same `'use cache'` and
Server Actions a production team would ship — but nobody outside your
laptop has ever loaded it.

```bash
npm run dev -- 14-suspense-solution
# → only reachable from this machine, only while this process is running
```

<div>

- `next dev` is a development server: it recompiles on every save, it
  skips some production optimizations on purpose, and it dies the moment
  you close the terminal. None of that is a flaw — it's built for the
  editing loop you've lived in all week.
- Going live means answering a different question than any module so far:
  not "does this component render correctly," but **"what process, on
  what machine, keeps this app running after I walk away?"**
- Module 01 opened with five questions plain React leaves unanswered.
  Routing, server rendering, build tooling, and client-vs-server all got
  their own module. One question has been waiting since day one:
  **"how do I deploy this thing?"** This module is that answer.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Callback moment — if you have module 01's slide 10-problem.md fresh in memory, literally say "this is the fifth bullet from day one, finally." It lands better spoken than written. Keep energy up, this is the last new concept of the course.
