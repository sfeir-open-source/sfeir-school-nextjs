import { Expense } from '@/types';
import clsx from 'clsx';

type ExpensesTableProps = {
  expenses: Array<Expense>;
};

const ExpensesTable: React.FC<ExpensesTableProps> = async ({ expenses }) => (
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Label
        </th>
        <th scope="col" className="px-6 py-3">
          Category
        </th>
        <th scope="col" className="px-6 py-3">
          Currency
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
      </tr>
    </thead>
    <tbody>
      {expenses.map((expense, index) => (
        <tr
          key={expense.id}
          className={clsx('bg-white  dark:bg-gray-800 dark:border-gray-700', index < expenses.length - 1 && 'border-b')}
        >
          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {expense.label}
          </th>
          <td className="px-6 py-4">{expense.category}</td>
          <td className="px-6 py-4">{expense.price.currency}</td>
          <td className="px-6 py-4">{expense.price.priceIncludingTax}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ExpensesTable;
