import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';
import ExpensesList from '@/components/ExpensesList';

const Expenses = async () => {
  const expensesData = await expensesApi.findAll();
  return (
    <>
      <PageTitle>Expenses</PageTitle>
      <ExpensesList expenses={expensesData?.data} />
    </>
  );
};

export default Expenses;
