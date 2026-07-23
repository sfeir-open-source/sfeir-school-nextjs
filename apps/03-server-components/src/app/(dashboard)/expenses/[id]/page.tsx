import { ExpenseDetails, PageTitle } from '@sfeir/ui/server';

import expensesData from '@/data/expense.json' with { type: 'json' };
import { Expense } from '@sfeir/types';

const SingleExpense = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const expense = expensesData.find(expense => expense.id === params.id);

  if (!expense) return <PageTitle backHref="/expenses">Expense not found</PageTitle>;

  return (
    <>
      <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
      {expense && <ExpenseDetails expense={expense as Expense} />}
    </>
  );
};

export default SingleExpense;
