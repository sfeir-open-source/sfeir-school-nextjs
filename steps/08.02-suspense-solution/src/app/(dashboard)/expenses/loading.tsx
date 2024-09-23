import PageTitle from '@/components/PageTitle';
import TableLoading from '@/components/TableLoading';

const LoadingExpenses = () => (
  <>
    <PageTitle>Expenses</PageTitle>
    <TableLoading rows={10} cols={4} />
  </>
);

export default LoadingExpenses;
