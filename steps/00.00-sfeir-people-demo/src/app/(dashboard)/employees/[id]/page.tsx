import Link from 'next/link';

import * as peopleApi from '@/api/people';

import PersonCard from '@/components/PersonCard';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import EmployeeExpenses from '@/components/EmployeeExpenses';
import Paper from '@/components/Paper';
import { Suspense } from 'react';
import TableLoading from '@/components/TableLoading';

const EmployeeDetail = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  const employee = await peopleApi.findOne(params.id);

  return (
    <>
      <PageTitle backHref="/employees">
        {employee.firstname} {employee.lastname}
      </PageTitle>

      <div className="flex gap-4 mt-4">
        <div className="w-3/5">
          <PersonCard
            person={employee}
            actions={
              <>
                <Button variant="secondary" component={Link} href={`/employees/${employee.id}/edit`}>
                  Edit
                </Button>
              </>
            }
          />
        </div>
        <Paper className="w-2/5">
          <h2 className="text-xl font-bold p-4">Last expenses</h2>
          <Suspense fallback={<TableLoading rows={5} cols={5} />}>
            <EmployeeExpenses employeeId={params.id} />
          </Suspense>
        </Paper>
      </div>
    </>
  );
};

export default EmployeeDetail;
