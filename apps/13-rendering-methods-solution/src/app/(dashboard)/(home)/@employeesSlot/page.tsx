import { getEmployeesUncached } from '@/app/providers/employees';
import { PersonCard } from '@sfeir/ui-solution/server';
import { connection } from 'next/server';
import { Suspense } from 'react';

const EmployeesList = async () => {
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

const EmployeesSlot = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <EmployeesList />
  </Suspense>
);

export default EmployeesSlot;
