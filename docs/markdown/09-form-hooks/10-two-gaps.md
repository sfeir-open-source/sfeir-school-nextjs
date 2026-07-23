<!-- .slide: class="with-code" -->

# Module 08's form works. Try to break it.

`createEmployee` is wired up, `FormData` flows in, `revalidateTag` and
`redirect` fire on success. The form from module 08 is still exactly this —
a plain `<form>`, nothing tracking what's happening while it submits:

```tsx
// libs/ui — the form as module 08 left it
export const EmployeeForm = ({ employee, action, className }: EmployeeFormProps) => {
  return (
    <form action={action} className={className}>
      {/* ...fields... */}
      <Button className="mt-4" variant="primary" type="submit">
        Submit
      </Button>
    </form>
  );
};
```

<div>

- **Double-click submit** — nothing disables the button while the request is
  in flight, so two clicks fire two `createEmployee` calls. Nothing in this
  component even knows a submission is happening.
- **Type an invalid email, submit** — the backend rejects it, but the
  function that called it never gets a chance to say why: no state, no
  message, nowhere on screen for an error to land.
- Two real gaps, same root cause: this form has no memory of what its own
  submit is doing.

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->

Notes:

Live-demo this if you can: double-click a submit button on the actual 07-server-action-solution app, or type a one-character firstname and watch the request just fail silently / redirect anyway if validation isn't wired. Concrete broken behavior sells the next slide much better than describing it.
