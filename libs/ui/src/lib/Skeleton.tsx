import { cn } from '@sfeir/helpers';

type SkeletonProps = {
  rounded?: boolean;
  className?: string;
};

export const Skeleton = ({ rounded = true, className }: SkeletonProps) => {
  return <div role="status" className={cn('animate-pulse bg-gray-200 dark:bg-gray-700', rounded && 'rounded-lg', className)}></div>;
};
