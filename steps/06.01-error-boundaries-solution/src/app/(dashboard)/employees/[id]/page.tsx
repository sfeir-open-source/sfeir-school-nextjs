import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';

import * as peopleApi from '@/api/people';
import EmployeeExpenses from '@/components/EmployeeExpenses';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  const employee = await peopleApi.findOne(params.id);

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
