import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';

import * as peopleApi from '@/api/people';
import EmployeeExpenses from '@/components/EmployeeExpenses';
import { notFound } from 'next/navigation';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  try {
    const employee = await peopleApi.findOne(params.id);
    return (
      <>
        <PageTitle backHref="/employees">
          Single Employee - {employee.firstname} {employee.lastname}
        </PageTitle>
        <PersonCard person={employee} actions={<EmployeeExpenses employeeId={employee.id} />} />
      </>
    );
  } catch (err) {
    if (err.message === 'Not Found') {
      notFound();
    }

    throw err;
  }
};

export default EmployeeDetail;
