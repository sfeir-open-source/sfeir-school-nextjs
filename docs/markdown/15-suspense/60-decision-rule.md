<!-- .slide: class="with-code" -->

# Which one, when?

- **"Is this whole route segment naturally slow to start?"** → `loading.tsx`.
  `/expenses`, both home page slots — nothing on those routes resolves
  quickly, so wrapping the entire segment at the file-convention level is
  the right grain, and it's less code than typing `<Suspense>` by hand for
  every `page.tsx`.
- **"Is most of this page fast, but one specific piece is slow?"** → a
  nested, hand-written `<Suspense>`, placed exactly around that one piece.
  `/employees/[id]` is the textbook case: the person's details resolve
  almost instantly, only their expenses list needs to wait — a `loading.tsx`
  covering the whole page would make that fast 90% wait on the slow 10%
  for nothing.
- Both are, underneath, the exact same React primitive from module 12: a
  boundary and a `fallback`. The only real decision is where to draw the
  line — around a whole segment, or around one component living inside it.

Notes:

This is the slide to point back to if someone asks "so when do I actually use which." Keep it to these two questions — resist expanding into more categories, the two-question framing is deliberately simple.
