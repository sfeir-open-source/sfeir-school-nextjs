import Skeleton from '@/components/Skeleton';

const LoadingEmployeesSlot = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(6)].map((_, index) => (
        <Skeleton key={index} className="min-h-48" />
      ))}
    </div>
  );
};

export default LoadingEmployeesSlot;
