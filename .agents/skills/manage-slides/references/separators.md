# Separators reference

| Marker                                                        | Purpose                                                                                       | Scope                   |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------- |
| `##==##`                                                      | Starts a new **sibling slide** in the same file (its own optional `<!-- .slide: ... -->` tag) | Whole file              |
| `##++##`                                                      | Starts/ends a **column** inside a `tc-multiple-columns` slide (used in pairs)                 | Inside one slide        |
| `<!-- .element: class="fragment" data-fragment-index="N" -->` | Marks the **preceding element** as a click-to-reveal fragment (standard reveal.js)            | Inside one slide/column |
| `Notes:`                                                      | Everything after this line (until next separator) is speaker notes, **written in English**    | End of a slide/column   |

`##++##` is a column boundary, not a "next step" fragment — do not use it to build progressive reveals. For progressive reveal, use the fragment `<!-- .element -->` comment after the element you want to hide/reveal.

A file split with `##==##` still gets **one** entry in `slides.js` — all its sibling slides play in sequence from that single path. Each `##==##` block can carry its own `<!-- .slide: ... -->` directive; omit it to inherit plain defaults.
