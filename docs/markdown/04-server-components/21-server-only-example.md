<!-- .slide: class="with-code" -->

# Proof: code a browser could never run

The solution app's `employees/page.tsx` logs every search to a file, straight
from inside the page component:

<small>

```tsx
// app/(dashboard)/employees/page.tsx
import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';

const Employees = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const search = (await searchParams).search || '';
  // ...filter employees...

  const logPath = join(process.cwd(), '../../', 'logs.txt');
  await appendFile(logPath, `${JSON.stringify({ date: new Date().toISOString(), search }, null, 2)}\n`);

  return <div>{/* ...render the list... */}</div>;
};
```

</small>

- `node:fs/promises` is a **Node.js built-in** — browsers have no filesystem,
  so this import simply doesn't exist on the client. There's no polyfill for
  "write a file" in a browser tab.
- No API route, no separate backend call — the page component reaches
  straight into the filesystem and writes to it, in the same function that
  renders the UI.
- This only works because this file never ships to, or runs in, the browser.
  Try adding `'use client'` to the top of this file and the build fails
  immediately — that import doesn't resolve on the client.

Notes:

This is the "why this is powerful" half of the story. Node APIs, database drivers, secret env vars — all fair game in a Server Component, with zero API-layer ceremony. We'll build the /employees/logs page that reads this same file back in the lab.
