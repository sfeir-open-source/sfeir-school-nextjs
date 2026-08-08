import { getEmployees } from '@/app/providers/employees';
import { Person } from '@sfeir/types';
import { Search } from '@sfeir/ui-solution';
import { Button, PageTitle, PersonCard } from '@sfeir/ui-solution/server';
import Link from 'next/link';
import { appendFile } from 'node:fs/promises';
import { join } from 'node:path';

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
  const employees = await getEmployees(search);

  const formatLog = {
    date: new Date().toISOString(),
    search,
    filteredEmployees: employees.items.length,
  };

  const logPath = join(process.cwd(), '../../', 'logs.txt');
  await appendFile(logPath, `${JSON.stringify(formatLog, null, 2)}\n`);

  return (
    <div className="flex flex-col">
      <PageTitle>Employees</PageTitle>
      <Search />
      <div className="grid grid-cols-4 gap-4">
        {employees.items.map(employee => (
          <PersonCard key={employee.id} person={employee} actions={actions(employee)} />
        ))}
      </div>
    </div>
  );
};

export default Employees;
