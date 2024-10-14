import { Expense } from '@/types';
import Paper from './Paper';

type ExpenseDetailsRowProps = {
  label: string;
  value: string;
};

const ExpenseDetailsRow: React.FC<ExpenseDetailsRowProps> = ({ label, value }) => (
  <div>
    <span className="block text-gray-500 text-sm">{label}</span>
    <span className="block">{value}</span>
  </div>
);

type ExpenseDetailsProps = {
  expense: Expense;
};

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({ expense }) => (
  <>
    <div className="flex gap-4">
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Information</h2>
        <Paper className="p-4 space-y-4 mb-4">
          <ExpenseDetailsRow label="Label" value={expense.label} />
          <ExpenseDetailsRow label="Category" value={expense.category} />
          <ExpenseDetailsRow label="Description" value={expense.description} />
        </Paper>
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Workflow</h2>
        <Paper className="p-4 space-y-4 mb-4">
          <ExpenseDetailsRow label="Creation date" value={new Date(expense.creationDate).toLocaleString('en-GB')} />
          <ExpenseDetailsRow label="Last update" value={new Date(expense.updateDate).toLocaleString('en-GB')} />
          <ExpenseDetailsRow label="Status" value={expense.status} />
        </Paper>
      </div>
    </div>
    <div className="flex gap-4">
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Amount</h2>
        <ExpenseDetailsRow
          label="Without taxes"
          value={`${expense.price.priceExcludingTax} ${expense.price.currency}`}
        />
        <ExpenseDetailsRow label="Tax amount" value={`${expense.price.taxAmount} ${expense.price.currency}`} />
        <ExpenseDetailsRow label="Total" value={`${expense.price.priceIncludingTax} ${expense.price.currency}`} />
      </div>
    </div>
  </>
);

export default ExpenseDetails;
