import * as peopleApi from '@/api/people';
import Pagination from '@/components/Pagination';
import PersonCard from '@/components/PersonCard';
import Search from '@/components/Search';

const Employees = async ({ searchParams }: { searchParams: { search?: string; page?: string } }) => {
  const peopleData = await peopleApi.findAll({
    page: Number(searchParams.page) || 1,
    search: searchParams.search,
  });

  return (
    <div className="flex flex-col">
      <h1 className="heading1">Employees</h1>
      <Search className="mb-4" />
      <div className="grid grid-cols-4 gap-4">
        {peopleData.data?.map((employee) => (
          <PersonCard key={employee.id} person={employee} />
        ))}
      </div>
      <Pagination className="mx-auto mt-4" totalPages={peopleData.pagination?.total_pages} />
    </div>
  );
};

export default Employees;
