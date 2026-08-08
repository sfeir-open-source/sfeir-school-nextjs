<!-- .slide: class="with-code" -->

# The dance you're **not** going to write

In most React apps, "go fetch this from an API" means a small ritual, every
single time:

<small>

```tsx
// a typical Client Component, in a typical React app
const EmployeesList = () => {
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/employees')
      .then(res => res.json())
      .then(data => {
        setEmployees(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  return <ul>{employees.map(/* ... */)}</ul>;
};
```

</small>

- Two pieces of state just to hold one piece of data: the data itself, and
  whether you're still waiting on it.
- The component renders once empty, then again once the data lands — a
  visible flash, on every page load.
- And this only starts firing **after** the component has already mounted in
  the browser — the request doesn't even begin until the JS has loaded and
  run.

Notes:

They haven't written this exact code in this course — it's the pattern from every "learn React" tutorial they've probably seen elsewhere. No need to dwell, just enough to make the next slide land as a relief rather than a surprise.
