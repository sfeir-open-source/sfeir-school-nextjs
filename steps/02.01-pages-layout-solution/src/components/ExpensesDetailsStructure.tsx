import Skeleton from './Skeleton';

type ExpenseDetailsStructureProps = {
  information: React.ReactNode;
  workflow: React.ReactNode;
  amount: React.ReactNode;
  employee: React.ReactNode;
};

const ExpenseDetailsStructure: React.FC<ExpenseDetailsStructureProps> = ({
  information,
  workflow,
  amount,
  employee,
}) => (
  <>
    <div className="flex gap-4">
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Information</h2>
        {information}
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Workflow</h2>
        {workflow}
      </div>
    </div>
    <div className="flex gap-4">
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Amount</h2>
        {amount}
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-semibold mb-2">Employee</h2>
        {employee}
      </div>
    </div>
  </>
);

export default ExpenseDetailsStructure;
