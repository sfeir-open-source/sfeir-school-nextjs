<!-- .slide: class="with-code" -->

# Wait, isn't that a contradiction?

Module 04 left you with two statements that sound like they can't both be
true:

<div>

- **The rule:** a Client Component can't `import` a Server Component. Once
  you're inside a `'use client'` file's import graph, everything it pulls in
  becomes client code too.
- **The good-to-know:** a Client Component **can** receive a Server Component
  as `children` — that's exactly what happened with `Pagination` and
  `EmployeesList` in the last tree diagram.
- If "can never import one" and "can receive one" are both true at the same
  time... what's actually different between those two? Sit with that for a
  second before the next slide gives it away.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Genuinely pause here — ask the room to try to resolve it themselves before clicking forward. Most will land close to the answer ("it's not really imported, it's just... there?") if given ten seconds. That instinct is exactly right, the next slide just makes it precise.
