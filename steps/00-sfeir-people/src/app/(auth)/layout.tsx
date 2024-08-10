type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-blue-500"></div>
      <div className="w-2/3 flex flex-col">{children}</div>
    </div>
  );
};

export default AuthLayout;
