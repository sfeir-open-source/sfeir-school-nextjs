import { ExpensesTable, PageTitle } from '@sfeir/ui/server';

import { getExpenses } from '@/app/providers/expensees';

const Expenses = async () => {
  const expenses = await getExpenses();
  return (
    <>
      <PageTitle>Expenses</PageTitle>
      <ExpensesTable expenses={expenses.items} />
    </>
  );
};

export default Expenses;
