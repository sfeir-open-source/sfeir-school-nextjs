import { Suspense } from 'react';

import ExpenseDetails from '@/components/ExpenseDetails';
import ExpenseDetailsLoading from '@/components/ExpenseDetailsLoading';
import InterceptionModal from '@/components/InterceptionModal';

const ExpenseModal = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <InterceptionModal title="Expense details">
      <div className="p-4 bg-blue-50 dark:bg-slate-950">
        <Suspense fallback={<ExpenseDetailsLoading />}>
          <ExpenseDetails expenseId={params.id} />
        </Suspense>
      </div>
    </InterceptionModal>
  );
};

export default ExpenseModal;
