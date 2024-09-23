import ExpensesTable from '@/components/ExpensesTable';
import PageTitle from '@/components/PageTitle';

import * as expensesApi from '@/api/expenses';

const Expenses = async () => {
  const expensesData = await expensesApi.findAll();
  return (
    <>
      <PageTitle>Expenses</PageTitle>
      <ExpensesTable expenses={expensesData?.data} />
    </>
  );
};

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default Expenses;
