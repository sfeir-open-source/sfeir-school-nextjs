<!-- .slide: class="two-column with-code " -->

# Conventions

## Not only for forms

Server actions are not limited to form actions. They can be also executed by anything in a client component as :

- event handlers
- effects (useEffect)
- callbacks
- ...

##--##

<br/> 
Example :

```jsx
'use client';

import { approveExpense } from './actions';
import { useState } from 'react';

export default function ApproveExpense({ expense }) {
  const [expenseStatus, setExpenseStatus] = useState(expense.status);

  return (
    <>
      <p>Status: {expenseStatus}</p>
      <button
        onClick={async () => {
          const updatedExpense = await approveExpense();
          setExpenseStatus(updatedExpense.status);
        }}
      >
        Approve
      </button>
    </>
  );
}
```

_This is where you benefit most from the advantages of the asynchronous function, and the ability to return a value_
