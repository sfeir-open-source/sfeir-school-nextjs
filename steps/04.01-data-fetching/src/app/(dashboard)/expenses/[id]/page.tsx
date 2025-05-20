import ExpenseDetails from '@/components/ExpensesDetails';
import PageTitle from '@/components/PageTitle';

import expensesData from '@/data/expenses.json';
import { Expense } from '@/types';

const SingleExpense = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const expense = expensesData.find((expense) => expense.id === params.id);

  return (
    <>
      <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
      {expense && <ExpenseDetails expense={expense as Expense} />}
    </>
  );
};

export default SingleExpense;
