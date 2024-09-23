import clsx from 'clsx';

import Skeleton from './Skeleton';

type TableLoading = {
  rows: number;
  cols: number;
  heading?: boolean;
};

const TableLoading: React.FC<TableLoading> = async ({ rows = 4, cols = 4, heading = true }) => (
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    {heading && (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {[...Array(cols)].map((_, index) => (
            <th key={index} scope="col" className={clsx('px-2 py-4', index === 0 && 'pl-4', index === cols && 'pr-4 ')}>
              <Skeleton className="min-h-4" />
            </th>
          ))}
        </tr>
      </thead>
    )}

    <tbody>
      {[...Array(rows)].map((_, index) => (
        <tr
          key={index}
          className={clsx('bg-white  dark:bg-gray-800 dark:border-gray-700', index !== rows && 'border-b')}
        >
          {[...Array(cols)].map((_, index) => (
            <td key={index} scope="col" className={clsx('px-2 py-4', index === 0 && 'pl-4', index === cols && 'pr-4 ')}>
              <Skeleton className="min-h-4" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default TableLoading;
