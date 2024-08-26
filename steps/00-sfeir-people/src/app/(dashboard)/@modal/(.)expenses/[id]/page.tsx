import InterceptionModal from '@/components/InterceptionModal';

import * as expensesApi from '@/api/expenses';

const ExpenseModal = async ({ params }: { params: { id: string } }) => {
  const expense = await expensesApi.findOne(params.id);
  return <InterceptionModal title={expense.label}>yo</InterceptionModal>;
};

export default ExpenseModal;
