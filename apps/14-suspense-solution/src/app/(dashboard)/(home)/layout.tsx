import { PageTitle, Paper } from '@sfeir/ui-solution/server';
import { ReactNode } from 'react';

type HomeLayoutProps = {
  employeesSlot?: ReactNode;
  expensesSlot?: ReactNode;
};

const HomeLayout = ({ employeesSlot, expensesSlot }: HomeLayoutProps) => {
  return (
    <>
      <PageTitle>SFEIR People</PageTitle>
      <div className="flex gap-4">
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Employees onboarding</h2>
          {employeesSlot}
        </div>
        <div className="w-1/2">
          <h2 className="text-xl font-bold mb-4">Last expenses</h2>
          <Paper>{expensesSlot}</Paper>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
