<!-- .slide: class="with-code" -->

# Splitting one page into independent regions: `@slot` folders

The home page renders two widgets side by side — recent employees, recent
expenses — both fetched independently, both on the URL `/`. This app builds
that with a **Parallel Route**: folders named `@something` that render as
props into their layout, instead of stacking into `page.tsx`'s `children`:

```
app/(dashboard)/(home)/
  layout.tsx              ← receives BOTH slots as props
  @employeesSlot/
    page.tsx               ← renders independently
  @expensesSlot/
    page.tsx               ← renders independently
```

<small>

```tsx
// app/(dashboard)/(home)/layout.tsx
const HomeLayout = ({ employeesSlot, expensesSlot }: HomeLayoutProps) => (
  <>
    <PageTitle>SFEIR People</PageTitle>
    <div className="flex gap-4">
      <div className="w-1/2">{employeesSlot}</div>
      <div className="w-1/2">
        <Paper>{expensesSlot}</Paper>
      </div>
    </div>
  </>
);
```

</small>

- `@employeesSlot` and `@expensesSlot` each behave like their own tiny
  route: their `page.tsx` fetches its own data, on its own schedule. The `@`
  prefix is what tells Next.js "this is a slot, not a URL segment" — it
  never appears in the browser's address bar.
- The layout receives them exactly like `children` — as props, named after
  the folder. `employeesSlot` isn't a special keyword, it's just a prop name
  that happens to match `@employeesSlot`.
- This is new vocabulary for this course, and it's narrow on purpose: the
  one thing to remember it for is *independently-rendered regions of the
  same page* — not a general-purpose routing tool to reach for by default.

Notes:

Keep the framing tight, as flagged: this is not the moment to teach parallel routes as a general App Router feature (conditional routing, modals, tab UIs) — one paragraph of "this is what @slot means" is enough, then move straight to why it matters for error isolation on the next slide.
