import employeesData from '@/data/employee.json' with { type: 'json' };
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = employeesData.find(employee => employee.id === params.id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref="/employees">
        Single Employee - {employee.firstname} {employee.lastname}
      </PageTitle>
      <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />
    </>
  );
};

export default EmployeeDetail;
