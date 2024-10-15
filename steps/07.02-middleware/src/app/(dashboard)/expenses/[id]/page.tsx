import ExpenseDetails from '@/components/ExpensesDetails';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';
import { notFound } from 'next/navigation';

const SingleExpense = async ({ params }: { params: { id: string } }) => {
  try {
    const expense = await expensesApi.findOne(params.id);

    return (
      <>
        <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
        {expense && <ExpenseDetails expense={expense} />}
      </>
    );
  } catch (err) {
    if (err.message === 'Not Found') {
      notFound();
    }

    throw err;
  }
};

export const fetchCache = 'force-no-store';

export default SingleExpense;
