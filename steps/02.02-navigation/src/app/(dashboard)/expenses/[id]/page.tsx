import ExpenseDetails from '@/components/ExpensesDetails';
import PageTitle from '@/components/PageTitle';

import expensesData from '@/data/expenses.json';
import { Expense } from '@/types';

const SingleExpense = ({ params }: { params: { id: string } }) => {
  const expense = expensesData.find((expense) => expense.id === params.id);

  return (
    <>
      <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
      {expense && <ExpenseDetails expense={expense as Expense} />}
    </>
  );
};

export default SingleExpense;
