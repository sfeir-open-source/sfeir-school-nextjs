import Link from 'next/link';

import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import PersonCard from '@/components/PersonCard';
import Search from '@/components/Search';

import * as peopleApi from '@/api/people';

const Employees = async ({ searchParams }: { searchParams: { search?: string } }) => {
  const search = searchParams.search || undefined;
  const employeesData = await peopleApi.findAll({ search });

  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <div className="flex items-start justify-between">
        <Search className="mb-4 self-start min-w-96" />
        <Button variant="secondary" component={Link} href="/employees/new">
          New
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {employeesData?.data?.map((employee) => (
          <PersonCard
            key={employee.id}
            person={employee}
            actions={
              <div className="flex flex-wrap gap-2">
                <Button component={Link} href={`/employees/${employee.id}`}>
                  View detail
                </Button>
                <Button component={Link} href={`/employees/${employee.id}/edit`}>
                  Edit
                </Button>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Employees;
