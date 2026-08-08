<!-- .slide: class="with-code" -->

# Step 6: the browser makes the HTML interactive

Every chunk from the last two slides arrives as real HTML — a visitor sees
it immediately, before a single line of client JavaScript has run. But a
`SubmitFormButton` from module 09, or a `Search` client component, isn't
clickable yet from HTML alone:

```tsx
// libs/ui-solution/src/lib/SubmitFormButton.tsx
'use client';
const SubmitFormButton = () => {
  const { pending } = useFormStatus(); // needs React running in the browser
  /* ... */
};
```

- **HTML first**: what streamed in from steps 4–5 is a fast, non-interactive
  preview — text, layout, images are already visible and readable.
- **Then hydration**: React runs in the browser, walks that same tree, and
  attaches the event handlers every `'use client'` component needs —
  `onClick`, `useFormStatus`, `useState` — without re-fetching or re-building
  the HTML that's already on screen.
- That's why a page can *look* done half a second before its buttons
  actually respond to a click: the HTML arrived first, hydration is the
  step that follows right behind it, and it's specifically Client
  Components — the ones from module 04's decision rule — that need it.

Notes:

Keep this tightly scoped to what a beginner needs: HTML shows first, hydration wires up interactivity after, only Client Components need it. Resist going into the React Server Component Payload / reconciliation mechanics unless someone asks — that's the more advanced version of this same idea, straight from nextjs.org/docs/app/getting-started/server-and-client-components if it comes up.
