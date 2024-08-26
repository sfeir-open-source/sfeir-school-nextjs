type AlertProps = {
  children: React.ReactNode;
};

const Alert: React.FC<AlertProps> = ({ children }) => (
  <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {children}
  </div>
);

export default Alert;
