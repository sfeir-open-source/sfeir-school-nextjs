import { getExpenses } from '@/app/providers/expensees';
import { ExpensesTable } from '@sfeir/ui-solution/server';
import { Suspense } from 'react';

const ExpensesList = async () => {
  const { items: latestExpenses } = await getExpenses({ perPage: 10, sortBy: 'updateDate', order: 'desc' });
  return <ExpensesTable expenses={latestExpenses} />;
};

const ExpensesSlot = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ExpensesList />
  </Suspense>
);

export default ExpensesSlot;
