<!-- .slide: class="with-code" -->

# The optional third argument: `permalink`

`useActionState` actually takes a third, optional argument this app never
needs — but it's worth knowing it exists:

```tsx
const [state, formAction] = useActionState(
  submitAction,
  initialState,
  '/employees/new', // permalink
);
```

- **What it's for**: progressive enhancement. If the Server Action is
  submitted *before* the page's JavaScript has finished loading, the browser
  falls back to a real, full-page form submission — and `permalink` is the
  URL it navigates to for that fallback, instead of the current page's URL.
- Once the page is interactive, `permalink` has no effect at all —
  `formAction` behaves exactly like every other slide in this module.
- Why this app skips it: every `EmployeeForm` already renders on the exact
  URL it submits to (`/employees/new`, `/employees/[id]/edit`) — the
  fallback and the current page are the same page, so there's nothing extra
  to point `permalink` at.

Notes:

Keep this brief — one slide, no live demo. The honest framing: this matters most for pages composed from React Server Components where the form might render on one URL but needs a stable fallback target for the no-JS case. This app's forms don't have that split, so permalink would be a no-op here — good to know it exists, not something to reach for by default.
