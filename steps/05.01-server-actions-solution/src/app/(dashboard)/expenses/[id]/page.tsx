import ExpenseDetails from '@/components/ExpensesDetails';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';

const SingleExpense = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const expense = await expensesApi.findOne(params.id);

  return (
    <>
      <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
      {expense && <ExpenseDetails expense={expense} />}
    </>
  );
};

export default SingleExpense;
