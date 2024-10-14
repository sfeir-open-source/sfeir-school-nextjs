'use client';

import { Expense } from '@/types';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

type ExpensesTableProps = {
  expenses: Array<Expense>;
};

const ExpensesTable: React.FC<ExpensesTableProps> = ({ expenses }) => {
  const router = useRouter();

  const handleClick = (expenseId: string) => () => {
    router.push(`/expenses/${expenseId}`);
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="pl-4 pr-2 py-3">
            Label
          </th>
          <th scope="col" className="px-2 py-3">
            Creation date
          </th>
          <th scope="col" className="px-2 py-3">
            Category
          </th>
          <th scope="col" className="px-2 py-3">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr
            key={expense.id}
            className={clsx(
              'bg-white hover:bg-blue-50 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700',
              index < expenses.length - 1 && 'border-b'
            )}
            role="link"
            onClick={handleClick(expense.id)}
            aria-label={`View details of expense : "${expense.label}"`}
          >
            <td className="pl-4 pr-2 py-4 font-bold whitespace-nowrap dark:text-white">{expense.label}</td>
            <td className="px-2 py-4">{new Date(expense.creationDate).toLocaleDateString('en-GB')}</td>
            <td className="px-2 py-4">{expense.category}</td>
            <td className="pl-2 pr-4 py-4">
              {expense.price.priceIncludingTax} {expense.price.currency}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpensesTable;
