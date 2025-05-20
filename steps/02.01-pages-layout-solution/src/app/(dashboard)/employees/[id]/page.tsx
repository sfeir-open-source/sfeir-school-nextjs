import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';

import employeesData from '@/data/employees.json';

interface EmployeeDetailPageParams {
  params: Promise<{
    id: string;
  }>;
}

const EmployeeDetail = async ({ params }: EmployeeDetailPageParams) => {
  const { id } = await params;

  const employee = employeesData.find((employee) => employee.id === id);

  if (!employee) return <PageTitle backHref="/employees">Single Employee - Not found</PageTitle>;

  return (
    <>
      <PageTitle backHref="/employees">
        Single Employee - {employee.firstname} {employee.lastname}
      </PageTitle>
      <PersonCard person={employee} />
    </>
  );
};

export default EmployeeDetail;
