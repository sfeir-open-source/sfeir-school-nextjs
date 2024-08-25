import Link from 'next/link';

import * as peopleApi from '@/api/people';

import PersonCard from '@/components/PersonCard';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
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
        <div className="bg-white p-4 rounded-lg w-2/5 dark:bg-slate-900"></div>
      </div>
    </>
  );
};

export default EmployeeDetail;
