import Paper from '@/components/Paper';

import * as expensesApi from '@/api/expenses';
import ExpensesTable from '@/components/ExpensesTable';

const ExpensesSlot = async () => {
  const { data: latestExpenses } = await expensesApi.findAll({ perPage: 10, sortBy: 'updateDate', order: 'desc' });
  return (
    <Paper>
      <ExpensesTable expenses={latestExpenses} />
    </Paper>
  );
};

export default ExpensesSlot;
