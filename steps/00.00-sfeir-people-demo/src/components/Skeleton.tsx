import clsx from 'clsx';

type SkeletonProps = {
  rounded?: boolean;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ rounded = true, className }) => {
  return (
    <div
      role="status"
      className={clsx('animate-pulse bg-gray-200 dark:bg-gray-700', rounded && 'rounded-lg', className)}
    ></div>
  );
};

export default Skeleton;
