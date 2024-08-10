import Link from 'next/link';

import ArrowLeft from '@/components/Icons/ArrowLeft';
import EmployeeForm from '@/components/EmployeeForm';

import { create } from './../actions';

const EmployeeDetail = async () => {
  return (
    <>
      <div className="flex items-center gap-1">
        <Link
          href={`/employees`}
          className="text-white font-medium  block p-2.5 text-center items-center me-2 hover:bg-blue-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-gray-800" />
          <span className="sr-only">Icon description</span>
        </Link>
        <h1 className="text-2xl">
          <span className="font-bold">Employees</span> | Create
        </h1>
      </div>

      <div className="flex gap-4 mt-4 bg-white p-4 rounded-lg">
        <EmployeeForm className="w-full" action={create} />
      </div>
    </>
  );
};

export default EmployeeDetail;
