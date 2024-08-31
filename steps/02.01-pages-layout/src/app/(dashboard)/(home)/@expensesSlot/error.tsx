'use client';

import Alert from '@/components/Alert';

const ExpensesSlotError = () => (
  <Alert>
    <span className="font-bold">Oops !</span> Something went wrong trying to fetch latest expenses :/
  </Alert>
);

export default ExpensesSlotError;
