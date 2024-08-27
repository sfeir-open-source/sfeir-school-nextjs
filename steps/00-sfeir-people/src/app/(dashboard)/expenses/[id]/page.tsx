import ExpenseDetails from '@/components/ExpenseDetails';

const SingleExpense = ({ params }: { params: { id: string } }) => {
  return <ExpenseDetails expenseId={params.id} />;
};

export default SingleExpense;
