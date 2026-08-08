import { ExpenseDetails, PageTitle } from '@sfeir/ui/server';

import { getExpenseById } from '@/app/providers/expensees';
import { Expense } from '@sfeir/types';

const SingleExpense = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const expense = await getExpenseById(params.id);

  if (!expense) return <PageTitle backHref="/expenses">Expense not found</PageTitle>;

  return (
    <>
      <PageTitle>Single Expense - {expense?.label || 'Not found'}</PageTitle>
      {expense && <ExpenseDetails expense={expense as Expense} />}
    </>
  );
};

export default SingleExpense;
