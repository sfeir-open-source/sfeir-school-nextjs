import { Expense } from '@/types';
import Button from './Button';
import Link from 'next/link';

type ExpensesListProps = {
  expenses: Array<Expense>;
};

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses }) => {
  return (
    <ul className="w-full text-gray-500 dark:text-gray-400">
      {expenses.map((expense) => (
        <li key={expense.id} className="bg-white dark:bg-gray-800 dark:border-gray-700  p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-grow">
              <div className="font-bold text-gray-700 dark:text-white mb-2">{expense.label}</div>
              <div className=" text-gray-700 dark:text-white mb-2">{expense.description}</div>
              <div className="grid grid-cols-4 gap-2">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Creation date:</span>
                  <br />
                  {new Date(expense.creationDate).toLocaleDateString('en-GB')}
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Last update:</span>
                  <br />
                  {new Date(expense.creationDate).toLocaleDateString('en-GB')}
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span>
                  <br />
                  {expense.category}
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Price:</span>
                  <br />
                  {expense.price.priceIncludingTax} {expense.price.currency}
                </div>
              </div>
            </div>
            <div>
              <Button component={Link} href={`/expenses/${expense.id}`}>
                View detail
              </Button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpensesList;
