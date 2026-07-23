import { ExpensesTable } from '@sfeir/ui';
import { PageTitle } from '@sfeir/ui/server';

import expensesData from '@/data/expense.json' with { type: 'json' };
import { Expense } from '@sfeir/types';

const Expenses = async () => {
  return (
    <>
      <PageTitle>Expenses</PageTitle>
      <ExpensesTable expenses={expensesData as Array<Expense>} />
    </>
  );
};

export default Expenses;
