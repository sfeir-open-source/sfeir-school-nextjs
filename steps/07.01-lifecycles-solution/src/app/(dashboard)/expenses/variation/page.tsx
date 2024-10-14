import ExpensesTable from '@/components/ExpensesTable';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';

const Expenses = async () => {
  const expensesData = await expensesApi.findAll();
  return (
    <>
      <PageTitle>Expenses Variation</PageTitle>
      <ExpensesTable expenses={expensesData?.data} />
    </>
  );
};

export default Expenses;
