import { getExpenses } from '@/app/providers/expensees';
import { ExpensesTable } from '@sfeir/ui-solution/server';
import { connection } from 'next/server';

const ExpensesSlot = async () => {
  await connection();
  const { items: latestExpenses } = await getExpenses({ perPage: 10, sortBy: 'updateDate', order: 'desc' });
  return <ExpensesTable expenses={latestExpenses} />;
};

export default ExpensesSlot;
