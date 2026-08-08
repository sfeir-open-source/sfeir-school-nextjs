<!-- .slide: class="with-code" -->

# What this slide isn't showing yet

`error.tsx` is entirely about the crash you didn't see coming — a bug, a
backend that's actually down. Plenty of failures aren't like that at all:
an employee id that simply doesn't exist yet is completely normal, not a
crash.

- Rendering `<PageError>` or an `<Alert>` for "this employee doesn't exist"
  would be the wrong tool — that's not unexpected, it's a routine outcome a
  page should handle gracefully, in place.
- Module 11 is entirely dedicated to that side: `notFound()`, `not-found.js`,
  and the broader habit of modeling *expected* failures as return values
  instead of thrown exceptions — the same instinct module 09's `400`
  `ApiError` branch already started.
- Nothing from today changes: `error.tsx` stays exactly what it is, the
  safety net for the failures nobody planned for. Module 11 adds the other
  half — handling the ones you *did* plan for.

Notes:

Pure forward pointer, mirror module 08 and 09's closing slides. Don't teach notFound() here — one paragraph so the room isn't left thinking every failure belongs in an error.tsx.
