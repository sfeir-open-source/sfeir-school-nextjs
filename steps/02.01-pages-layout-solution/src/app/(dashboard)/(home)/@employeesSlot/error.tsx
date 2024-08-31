'use client';

import Alert from '@/components/Alert';

const EmployeesSlotError = () => (
  <Alert>
    <span className="font-bold">Oops !</span> Something went wrong trying to fetch latest employees :/
  </Alert>
);

export default EmployeesSlotError;
