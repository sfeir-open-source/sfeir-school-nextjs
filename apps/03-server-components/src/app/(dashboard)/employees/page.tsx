import employeesData from '@/data/employee.json' with { type: 'json' };
import { Person } from '@sfeir/types';
import { Search } from '@sfeir/ui';
import { Button, PageTitle, PersonCard } from '@sfeir/ui/server';
import Link from 'next/link';

const actions = (employee: Person) => (
  <div className="flex flex-wrap gap-2">
    <Button component={Link} href={`/employees/${employee.id}`}>
      View detail
    </Button>
    <Button component={Link} href={`/employees/${employee.id}/edit`}>
      Edit
    </Button>
  </div>
);

const Employees = async ({ searchParams }: { searchParams: Promise<{ search: string }> }) => {
  const search = (await searchParams).search || '';

  const filteredEmployees = employeesData.filter(
    employee => employee.firstname.toLowerCase().includes(search.toLowerCase()) || employee.lastname.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <Search />
      <div className="grid grid-cols-4 gap-4">
        {filteredEmployees?.map(employee => (
          <PersonCard key={employee.id} person={employee} actions={actions(employee)} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
