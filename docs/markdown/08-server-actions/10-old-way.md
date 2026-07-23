<!-- .slide: class="with-code" -->

# Everything so far has only read data

Modules 06 and 07 were entirely about *asking* for data — fetching it,
caching it. The `/employees/new` form you've seen since module 05 has fields,
but press submit and nothing happens: no action is wired up yet. Creating an
employee means *writing* data, and the classic React way to do that is a
small ritual of its own:

<small>

```tsx
// the dance you'd normally write, in a typical React app
const [pending, setPending] = useState(false);

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setPending(true);
  await fetch('/api/employees', { method: 'POST', body: new FormData(e.currentTarget) });
  setPending(false);
  router.push('/employees');
};

return <form onSubmit={handleSubmit}>{/* ... */}</form>;
```

</small>

- A Route Handler to receive the `POST`, a Client Component to hold
  `pending` state, an `onSubmit` that calls `preventDefault` and manually
  builds a `FormData` — three moving pieces just to save one form.
- Nothing here is *wrong*, exactly — it's the module 06 "old way" story
  again, one layer up: React give you the primitives, but you assemble them
  by hand, every time, for every form.
- Next.js has a shortcut for this whole ritual: a function you write once,
  that a `<form>` can call directly.

Notes:

Callback to module 06's useEffect dance — same shape of problem, different verb (write instead of read). Don't dwell on the code sample, it's a strawman to make the next slide feel like relief, not a pattern anyone in the room needs to memorize.
