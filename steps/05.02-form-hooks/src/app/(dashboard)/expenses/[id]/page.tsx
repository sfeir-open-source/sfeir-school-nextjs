import ExpenseDetails from '@/components/ExpensesDetails';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';

const SingleExpense = async ({ params }: { params: { id: string } }) => {
  const expense = await expensesApi.findOne(params.id);

  return (
    <>
      <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
      {expense && <ExpenseDetails expense={expense} />}
    </>
  );
};

export default SingleExpense;
