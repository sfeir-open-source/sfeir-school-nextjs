import { getEmployeesUncached } from '@/app/providers/employees';
import { PersonCard } from '@sfeir/ui-solution/server';
import { connection } from 'next/server';

const EmployeesSlot = async () => {
  await connection();
  const latestEmployees = await getEmployeesUncached({ perPage: 6, sortBy: 'entryDate', order: 'desc' });
  return (
    <div className="grid grid-cols-3 gap-4">
      {latestEmployees.items.map(employee => (
        <PersonCard key={employee.id} person={employee} compact />
      ))}
    </div>
  );
};

export default EmployeesSlot;
