import employeesData from '@/data/employee.json' with { type: 'json' };
import { EmployeeForm, PageTitle, PersonCard } from '@sfeir/ui-solution/server';

const Employees = async () => {
  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <EmployeeForm />
      <div className="grid grid-cols-4 gap-4">
        {employeesData?.map(employee => (
          <PersonCard key={employee.id} person={employee} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
