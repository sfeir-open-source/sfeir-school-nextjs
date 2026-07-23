<!-- .slide: class="with-code" -->

# One question to ask, every time

Faced with a new component, you only need to ask yourself one thing:

> **Does this need state, interactivity, or a browser API?**

- **Yes** → add `'use client'`. It needs to run in the browser, so let it.
- **No** → leave it alone. It's already a Server Component, and that's the
  better default — smaller bundle, direct backend access, nothing to opt
  into.
- Push `'use client'` as far down the tree as you can — onto the small
  interactive piece (a search box, a clickable row), not the whole page
  around it. That keeps the client boundary — and the JS you ship — as small
  as possible.

Notes:

This is the slide to point back to for the rest of the course whenever "should this be a Client Component" comes up. Say it out loud a couple of times, it's meant to be memorable.
