import ExpenseDetailsStructure from './ExpensesDetailsStructure';
import Skeleton from './Skeleton';

const ExpenseDetailsLoading: React.FC = () => (
  <ExpenseDetailsStructure
    information={<Skeleton className="min-h-48 mb-4" />}
    workflow={<Skeleton className="min-h-48 mb-4" />}
    amount={<Skeleton className="min-h-48 mb-4" />}
    employee={<Skeleton className="min-h-48 mb-4" />}
  />
);

export default ExpenseDetailsLoading;
