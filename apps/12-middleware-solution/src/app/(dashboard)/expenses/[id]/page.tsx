import { ExpenseDetails, PageTitle } from '@sfeir/ui-solution/server';

import { getExpenseById } from '@/app/providers/expensees';
import { ApiError } from '@sfeir/helpers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const SingleExpenseContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  try {
    const expense = await getExpenseById(id);
    return (
      <>
        <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
        <ExpenseDetails expense={expense} />
      </>
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }
    throw error;
  }
};

const SingleExpense = (props: { params: Promise<{ id: string }> }) => {
  return (
    <>
      <Suspense>
        <SingleExpenseContent params={props.params} />
      </Suspense>
    </>
  );
};

export default SingleExpense;
