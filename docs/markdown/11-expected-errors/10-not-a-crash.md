<!-- .slide: class="with-code" -->

# Not every failure is a bug

Module 10 was entirely about things going **wrong**: a `500`, a backend
that's down, a bug nobody saw coming. `error.tsx` exists to contain damage
you didn't plan for.

Visiting `/employees/does-not-exist` is a completely different situation:

- Nothing crashed. The server answered fine, the code ran exactly as
  written — it just looked up an id that isn't in the database. That's a
  routine, *anticipated* outcome, not an exception to survive.
- Next.js draws this exact line in its own docs: **expected errors** — a
  failed lookup, a bad form input — should be *modeled as return values*,
  never thrown. **Uncaught exceptions** are what `error.tsx` is for.
- This module is the other half of module 10: the same "closer to the
  problem, better the UI" instinct, applied to failures you *did* see
  coming.

Notes:

Anchor this hard against module 10 before touching any API — the whole module only clicks if the room already has error.tsx in mind as "the crash tool" to contrast against. A missing employee id is not a bug, it's just... not found.
