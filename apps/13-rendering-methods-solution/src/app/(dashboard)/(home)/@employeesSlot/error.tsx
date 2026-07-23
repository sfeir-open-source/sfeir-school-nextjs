'use client';

import { Alert } from '@sfeir/ui-solution/server';

const EmployeesSlotError = () => (
  <Alert>
    <span className="font-bold">Oops !</span> Something went wrong trying to fetch latest employees :/
  </Alert>
);

export default EmployeesSlotError;
