'use client';

import { Expense } from '@/types';
import { useRouter } from 'next/navigation';

type ExpensesTableRowProps = {
  expense: Expense;
  className: string;
  children: React.ReactNode;
};

const ExpensesTableRow: React.FC<ExpensesTableRowProps> = ({ expense, className, children }) => {
  const router = useRouter();

  const handleClick = (expenseId: string) => () => {
    router.push(`/expenses/${expenseId}`);
  };

  return (
    <tr
      className={className}
      role="link"
      onClick={handleClick(expense.id)}
      aria-label={`View details of expense : "${expense.label}"`}
    >
      {children}
    </tr>
  );
};

export default ExpensesTableRow;
