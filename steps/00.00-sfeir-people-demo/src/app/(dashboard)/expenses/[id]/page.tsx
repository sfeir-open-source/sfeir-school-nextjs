import { ErrorBoundary } from 'react-error-boundary';

import Alert from '@/components/Alert';
import ExpenseDetails from '@/components/ExpenseDetails';

const SingleExpense = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <ErrorBoundary fallback={<Alert>Oops, something went wrong :/</Alert>}>
      <ExpenseDetails expenseId={params.id} />
    </ErrorBoundary>
  );
};

export default SingleExpense;
