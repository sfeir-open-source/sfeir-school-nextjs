type PageErrorProps = {
  children: React.ReactNode;
  code?: number;
};

const PageError: React.FC<PageErrorProps> = ({ code = 500, children }) => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 dark:text-white">
      <div className="w-1/3 bg-gray-400 dark:bg-gray-600"></div>
      <div className="w-2/3 flex flex-col items-center justify-center h-100">
        <h1 className="text-4xl font-bold">Error {code}</h1>
        <p className="mt-4">{children}</p>
      </div>
    </div>
  );
};

export default PageError;
