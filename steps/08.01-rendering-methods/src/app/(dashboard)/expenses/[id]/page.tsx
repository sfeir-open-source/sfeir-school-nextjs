import ExpenseDetails from '@/components/ExpensesDetails';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';
import { notFound } from 'next/navigation';
import { ApiError } from '@/api/error';

const SingleExpense = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  try {
    const expense = await expensesApi.findOne(params.id);

    return (
      <>
        <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
        {expense && <ExpenseDetails expense={expense} />}
      </>
    );
  } catch (err) {
    if (err instanceof ApiError && err.message === 'Not Found') {
      notFound();
    }

    throw err;
  }
};

export default SingleExpense;
