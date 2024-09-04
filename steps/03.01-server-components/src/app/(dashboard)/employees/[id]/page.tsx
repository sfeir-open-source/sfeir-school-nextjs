import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';

import employeesData from '@/data/employees.json';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  const employee = employeesData.find((employee) => employee.id === params.id);

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
