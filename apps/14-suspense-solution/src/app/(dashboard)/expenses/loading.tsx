import { PageTitle, TableLoading } from '@sfeir/ui-solution/server';

const LoadingExpenses = () => (
  <>
    <PageTitle>Expenses</PageTitle>
    <TableLoading rows={10} cols={4} />
  </>
);

export default LoadingExpenses;
