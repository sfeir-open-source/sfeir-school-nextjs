'use client';

import { Alert } from '@sfeir/ui-solution/server';

const ExpensesSlotError = () => (
  <Alert>
    <span className="font-bold">Oops !</span> Something went wrong trying to fetch latest expenses :/
  </Alert>
);

export default ExpensesSlotError;
