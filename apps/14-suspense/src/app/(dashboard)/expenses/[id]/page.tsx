import { ExpenseDetails, PageTitle } from '@sfeir/ui/server';

import { getExpenseById, getExpenseIds } from '@/app/providers/expensees';
import { ApiError } from '@sfeir/helpers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateStaticParams() {
  const ids = await getExpenseIds();
  return ids.map(id => ({ id }));
}

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
