'use client';

import { Expense } from '@sfeir/types';
import { useRouter } from 'next/navigation';
import { memo, ReactNode, useCallback } from 'react';

type ExpensesTableRowProps = {
  className?: string;
  children: ReactNode;
  expense: Expense;
};
export const ExpensesTableRow = memo(({ expense, children, className = '' }: ExpensesTableRowProps) => {
  const router = useRouter();

  const handleClickRow = useCallback(
    (id: string) => () => {
      router.push(`/expenses/${id}`);
    },
    [router],
  );

  return (
    <tr
      key={expense.id}
      className={className}
      role="link"
      onClick={handleClickRow(expense.id)}
      aria-label={`View details of expense : "${expense.label}"`}
    >
      {children}
    </tr>
  );
});
