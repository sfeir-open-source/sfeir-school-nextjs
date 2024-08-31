import PageTitle from '@/components/PageTitle';

const SingleExpense = ({ params }: { params: { id: string } }) => {
  return <PageTitle>Single Expense - {params.id}</PageTitle>;
};

export default SingleExpense;
