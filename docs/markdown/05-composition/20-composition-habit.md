<!-- .slide: class="tc-multiple-columns with-code" -->

##++##

# Small pieces, reused everywhere

```tsx
// app/(dashboard)/employees/page.tsx
{filteredEmployees?.map(employee => (
  <PersonCard
    key={employee.id}
    person={employee}
    actions={actions(employee)}
  />
))}
```

A grid of cards on `/employees`...

##++##

##++##

<br/> <br/>

```tsx
// app/(dashboard)/employees/[id]/page.tsx
<PageTitle backHref="/employees">
  {employee.firstname} {employee.lastname}
</PageTitle>
<PersonCard person={employee} />
```

...and the exact same `PersonCard` — and `PageTitle` — again on
`/employees/[id]`. Same components, no copy-pasted markup, one place to fix a
bug or restyle a card.

##++##

Notes:

Same DRY instinct module 02 used to justify layout.tsx — "write the shared shell once" — just applied one level down, to ordinary reusable components instead of a route-level shell. PersonCard's compact prop (used elsewhere in the app) is worth pointing out if there's time: it's designed to be reused at different densities, not just different pages.
