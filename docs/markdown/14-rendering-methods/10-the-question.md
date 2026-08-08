<!-- .slide: class="with-code" -->

# Which pages are already built, and which aren't?

Module 07 gave data a shape: `'use cache'` turns a function's return value
into a photocopy, handed out instead of redone. Module 12 showed what
happens around the parts that can't be a photocopy — they stream in behind
a `<Suspense>` fallback. Zoom out one level and a new question appears:

```tsx
// app/(dashboard)/employees/[id]/page.tsx — as it stands since module 07
const EmployeeDetailContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const employee = await getEmployee(id); // 'use cache' — a photocopy, per id
  return /* ... */;
};

const EmployeeDetail = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeeDetailContent {...props} />
  </Suspense>
);
```

<div>

- A cached function's return value is a photocopy of *data*. But a page is
  just HTML — and HTML can be photocopied too. Nothing stops Next.js from
  building `/employees/42`'s finished page once and handing that same HTML
  to everyone who asks for it.
- So the question this module answers isn't "is caching on" — that was
  module 07. It's: **of everything you've built, which pages are sitting
  ready as finished HTML, and which ones get computed live, right now, for
  this one visitor?**
- Every idea in `cacheComponents`' rendering model — the static shell,
  `<Suspense>`, `generateStaticParams` — is Next.js's answer to that one
  question, applied at the level of a whole page instead of one function.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Land the reframe explicitly: this is the same photocopy idea from module 07, just applied one level up — to the page itself, not only to the data a page fetches. The room already has every building block; today just names what they add up to.
