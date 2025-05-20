import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';

import * as peopleApi from '@/api/people';
import EmployeeExpenses from '@/components/EmployeeExpenses';
import { notFound } from 'next/navigation';
import { ApiError } from '@/api/error';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
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
    if (err instanceof ApiError && err.message === 'Not Found') {
      notFound();
    }

    throw err;
  }
};

export default EmployeeDetail;
