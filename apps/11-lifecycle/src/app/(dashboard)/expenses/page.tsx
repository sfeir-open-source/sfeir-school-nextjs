import { ExpensesTable, PageTitle } from '@sfeir/ui/server';
import { Suspense } from 'react';

import { getExpenses } from '@/app/providers/expensees';

const ExpensesList = async () => {
  const expenses = await getExpenses();
  return <ExpensesTable expenses={expenses.items} />;
};

const Expenses = () => (
  <>
    <PageTitle>Expenses</PageTitle>
    <Suspense fallback={<div>Loading...</div>}>
      <ExpensesList />
    </Suspense>
  </>
);

export default Expenses;
