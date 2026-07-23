<!-- .slide: class="with-code" -->

# It doesn't just look shared — it stays put

Walking from the kitchen to the living room doesn't rebuild the hallway; you
just see a different room through the doorway. Layouts behave the same way
**across navigation**:

- Click from `/employees` to `/expenses`, and the sidebar, the logo, the
  navigation menu — none of it re-renders. Only the part inside `{children}`
  swaps.
- Any local state living in the layout (a scroll position, an open/closed
  menu) **survives** the navigation — it's reused, not remounted.
- This is also part of what makes navigation feel instant: the browser isn't
  re-fetching and repainting the whole page, only the piece that actually
  changed.

Notes:

Don't over-formalize this with rendering vocabulary (client vs. server, RSC) — that's module 04's job. The takeaway here is purely behavioral: layouts persist, pages swap. We'll see it live in the lab once /employees and /expenses share one sidebar.
