import PageTitle from '@/components/PageTitle';

const EmployeeDetail = async ({ params }: { params: { id: string } }) => {
  return (
    <>
      <PageTitle backHref="/employees">Single Employee - {params.id}</PageTitle>
    </>
  );
};

export default EmployeeDetail;
