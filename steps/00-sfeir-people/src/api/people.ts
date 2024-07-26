import { Person } from '@/types';

const baseUrl = process.env.API_BASE_URL;

export const findAll = async (): Promise<Array<Person>> => {
  const data = (await fetch(`${baseUrl}/people`).then((res) => res.json())) as Array<Person>;
  return data?.map((apiEmployee) => ({
    ...apiEmployee,
    photo: apiEmployee.photo ? baseUrl + apiEmployee.photo : undefined,
  }));
};
