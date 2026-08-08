# Registering a slide

Files are inert until registered. Path existence alone does not add a slide to the deck.

1. Pick the target module function in `docs/scripts/slides.js` (e.g. `routingSlides()`).
2. Add the file's path (relative to `docs/markdown/`) at the position where it should appear:

```javascript
function routingSlides() {
  return [
    '02-routing/00-title.md',
    '02-routing/40-layout.md',
    '02-routing/41-root-layout.md', // new slide inserted here
    // ...
  ];
}
```

3. `formation()` concatenates every module function in course order — don't touch it unless adding/reordering a whole module.
4. A file split with `##==##` still gets **one** entry in `slides.js`.

## Naming

`<prefix>-<slug>.md`, e.g. `40-layout.md`, or decimals for children of a concept: `10.1-naming-page.md`, `10.2-naming-layout.md`. Leave gaps (10, 20, 30…) for future insertions.
