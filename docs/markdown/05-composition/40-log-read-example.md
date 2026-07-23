<!-- .slide: class="with-code" -->

# One more server-only trick: reading it back

Module 04's `employees/page.tsx` writes a line to `logs.txt` on every search.
The composition app adds a second, dedicated Server Component that reads
that same file back — no API route, no client-side `fetch`:

<small>

```tsx
// app/(dashboard)/employees/logs/page.tsx
import { Code } from 'bright';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const Logs = async () => {
  const logFilePath = join(process.cwd(), '../../', 'logs.txt');
  try {
    const logFile = await readFile(logFilePath, 'utf-8');
    return <Code lang="json">{logFile}</Code>;
  } catch (_error) {
    return 'No logs file found :/';
  }
};

export default Logs;
```

</small>

- Same reasoning as `appendFile` in module 04: `node:fs/promises` only
  resolves on the server, so this component could never accidentally end up
  in the client bundle.
- Notice it's its own small `page.tsx` at `/employees/logs`, instead of
  bolting file-reading logic onto the `/employees` page it's related to.
  Composition isn't only about `'use client'` boundaries — it's the same
  "one small piece, one job" habit applied to server-only work too.
- Visit `/employees/logs` after searching a few times on `/employees` — the
  raw JSON lines are right there, syntax-highlighted by `bright`.

Notes:

Quick, concrete payoff rather than an academic aside — search a couple of times on /employees live, then open /employees/logs and show the file growing. Nothing here needed an API route or a database.
