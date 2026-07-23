import { Skeleton } from './Skeleton';
import { cn } from '@sfeir/helpers';

type TableLoadingProps = {
  rows: number;
  cols: number;
  heading?: boolean;
};

export const TableLoading = async ({ rows = 4, cols = 4, heading = true }: TableLoadingProps) => (
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    {heading && (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {[...Array(cols)].map((_, index) => (
            <th key={index} scope="col" className={cn('px-2 py-4', index === 0 && 'pl-4', index === cols && 'pr-4 ')}>
              <Skeleton className="min-h-4" />
            </th>
          ))}
        </tr>
      </thead>
    )}

    <tbody>
      {[...Array(rows)].map((_, index) => (
        <tr key={index} className={cn('bg-white  dark:bg-gray-800 dark:border-gray-700', index !== rows && 'border-b')}>
          {[...Array(cols)].map((_, index) => (
            <td key={index} scope="col" className={cn('px-2 py-4', index === 0 && 'pl-4', index === cols && 'pr-4 ')}>
              <Skeleton className="min-h-4" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);
