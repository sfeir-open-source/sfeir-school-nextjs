import { getEmployee } from '@/app/providers/employees';
import { EmployeeExpenses } from '@sfeir/ui';
import { PageTitle, PersonCard } from '@sfeir/ui/server';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = await getEmployee(params.id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />;
};

export default EmployeeDetail;
