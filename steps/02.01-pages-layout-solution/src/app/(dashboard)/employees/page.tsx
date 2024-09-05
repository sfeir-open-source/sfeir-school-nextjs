import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';

import employeesData from '@/data/employees.json';

const Employees = async () => {
  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <div className="grid grid-cols-4 gap-4">
        {employeesData?.map((employee) => (
          <PersonCard key={employee.id} person={employee} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
