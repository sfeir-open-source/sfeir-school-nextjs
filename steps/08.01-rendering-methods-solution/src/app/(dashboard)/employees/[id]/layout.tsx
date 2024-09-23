import * as peopleApi from '@/api/people';

type LayoutProps = {
  children: React.ReactNode;
};

export const generateStaticParams = async () => {
  const employees = await peopleApi.findAll({ perPage: 1000 });
  return employees.data.map((employee) => ({ id: employee.id }));
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return children;
};

export default Layout;

export const dynamicParams = false;
