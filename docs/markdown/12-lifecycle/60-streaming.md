<!-- .slide: class="with-code" -->

# "Streaming" is just that, named

Next.js's docs call this pattern **streaming**: instead of one server
response holding everything, hostage until the slowest piece is done, the
server sends the page in chunks, as each chunk becomes ready:

- **Chunk 1** — everything outside a `<Suspense>` boundary, plus every
  boundary's `fallback`: the sidebar, the page title, `@employeesSlot`'s
  actual widget (usually ready by then), and `@expensesSlot`'s
  "Loading..." placeholder.
- **Chunk 2** — sent a beat later, once `getExpenses` finally resolves: the
  real `ExpensesTable`, silently swapped in for the fallback that was there.
- The browser never sat on a fully blank tab waiting — it started painting
  the moment chunk 1 arrived, and kept updating as more chunks streamed in.
  That's the whole trick: send what's ready, don't hold it hostage for what
  isn't.

Notes:

If there's time, this is a good moment to point at the Network tab's response body directly and show that the HTML really does arrive in more than one piece — it's not a metaphor, it's literally how the bytes are sent over the wire.
