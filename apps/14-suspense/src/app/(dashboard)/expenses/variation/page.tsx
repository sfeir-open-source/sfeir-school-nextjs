import { getExpenses } from '@/app/providers/expensees';
import { ExpensesList, PageTitle } from '@sfeir/ui/server';
import { Suspense } from 'react';

const ExpensesContent = async () => {
  const { items } = await getExpenses();
  return (
    <>
      <PageTitle>Expenses</PageTitle>
      <ExpensesList expenses={items} />
    </>
  );
};

const Expenses = async () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExpensesContent />
    </Suspense>
  );
};

export default Expenses;
