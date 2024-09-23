import * as expensesApi from '@/api/expenses';
import ExpensesTable from '@/components/ExpensesTable';

const ExpensesSlot = async () => {
  const { data: latestExpenses } = await expensesApi.findAll({ perPage: 10, sortBy: 'updateDate', order: 'desc' });
  return <ExpensesTable expenses={latestExpenses} />;
};

export default ExpensesSlot;
