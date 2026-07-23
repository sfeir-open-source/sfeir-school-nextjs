<!-- .slide: class="with-code" -->

# Time to retire `employee.json`

Every list of employees and expenses you've rendered since module 02 came
from the same place: a JSON file sitting next to your code.

```tsx
// what every page has done so far
import employeesData from '@/data/employee.json' with { type: 'json' };

const employee = employeesData.find(employee => employee.id === params.id);
```

- That was never the real plan — it was a fixture, so you could focus on
  routing and components without a backend in the way.
- This app actually ships with one: `server`, a small Fastify API serving
  the exact same employees and expenses, over HTTP, from `localhost:9000`.
- The question for this module: how do you swap a local file for a real
  network call, without dragging back the `useState` / `useEffect` / loading
  spinner dance Server Components let you skip in module 04?

Notes:

Frame this as "you already know 90% of this" — the only thing changing is where the data comes from, not how the component is written. Keep the Fastify server as a black box for now, it's just "an API that happens to live in this repo too".
