import PageTitle from '@/components/PageTitle';
import Paper from '@/components/Paper';
import Link from 'next/link';

type HomeLayoutProps = {
  employeesSlot?: React.ReactNode;
  expensesSlot?: React.ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ employeesSlot, expensesSlot }) => {
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
