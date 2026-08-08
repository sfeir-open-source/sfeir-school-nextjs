import { ExpenseDetails, PageTitle } from '@sfeir/ui-solution/server';

import { getExpenseById } from '@/app/providers/expensees';
import { Expense } from '@sfeir/types';
import { Suspense } from 'react';

const SingleExpenseContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const expense = await getExpenseById(id);

  if (!expense) return <PageTitle backHref="/expenses">Expense not found</PageTitle>;

  return (
    <>
      <PageTitle>Single Expense - {expense.label}</PageTitle>
      <ExpenseDetails expense={expense as Expense} />
    </>
  );
};

const SingleExpense = (props: { params: Promise<{ id: string }> }) => (
  <Suspense fallback={<div>...loading</div>}>
    <SingleExpenseContent params={props.params} />
  </Suspense>
);

export default SingleExpense;
