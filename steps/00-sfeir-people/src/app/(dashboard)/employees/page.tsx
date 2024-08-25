import * as peopleApi from '@/api/people';
import Button from '@/components/Button';
import PageTitle from '@/components/PageTitle';
import Pagination from '@/components/Pagination';
import PersonCard from '@/components/PersonCard';
import Search from '@/components/Search';
import Link from 'next/link';

const Employees = async ({ searchParams }: { searchParams: { search?: string; page?: string } }) => {
  const peopleData = await peopleApi.findAll({
    page: Number(searchParams.page) || 1,
    search: searchParams.search,
  });

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
        {peopleData.data?.map((employee) => (
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
      <Pagination className="mx-auto mt-4" totalPages={peopleData.pagination?.total_pages} />
    </div>
  );
};

export default Employees;
