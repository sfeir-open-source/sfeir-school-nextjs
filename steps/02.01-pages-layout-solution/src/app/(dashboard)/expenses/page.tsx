import ExpensesTable from '@/components/ExpensesTable';
import PageTitle from '@/components/PageTitle';

import { Expense } from '@/types';

import expensesData from '@/data/expenses.json';

const Expenses = async () => {
  return (
    <>
      <PageTitle>Expenses</PageTitle>
      <ExpensesTable expenses={expensesData as Array<Expense>} />
    </>
  );
};

export default Expenses;
