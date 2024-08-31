import { ErrorBoundary } from 'react-error-boundary';

import Alert from '@/components/Alert';
import ExpenseDetails from '@/components/ExpenseDetails';

const SingleExpense = ({ params }: { params: { id: string } }) => {
  return (
    <ErrorBoundary fallback={<Alert>Oops, something went wrong :/</Alert>}>
      <ExpenseDetails expenseId={params.id} />
    </ErrorBoundary>
  );
};

export default SingleExpense;
