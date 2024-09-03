<!-- .slide: class="two-column with-code" -->

# Server actions

## Security considerations

Like route handlers, server-actions works with public HTTP calls. This requires security precautions

<div>

**1. Authorization**

Make sure that users are authorized to perform an action or to access the data :

```js
'use server';

import { cookies } from 'next/headers';
import { verifyToken } from '@/auth';

export async function approveExpense() {
  const token = cookies().get('auth-cookie')?.value;
  const user = verifyToken(token);
  if (!user) throw new Error('Unauthorized');

  // Mutations & server operations
}
```

</div>
<!-- .element: class="fragment" data-fragment-index="1"-->
