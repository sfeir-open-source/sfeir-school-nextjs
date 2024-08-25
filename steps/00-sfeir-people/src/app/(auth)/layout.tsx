type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-950 dark:text-white">
      <div className="w-1/3 bg-blue-500 dark:bg-blue-800"></div>
      <div className="w-2/3 flex flex-col">{children}</div>
    </div>
  );
};

export default AuthLayout;
