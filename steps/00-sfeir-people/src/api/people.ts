import { PaginationAttributes, Person } from '@/types';
import qs from 'query-string';

const baseUrl = process.env.API_BASE_URL;

export const findAll = async (query: {
  search?: string;
  page?: number;
  perPage?: number;
}): Promise<{ data: Array<Person>; pagination: PaginationAttributes }> => {
  const url = qs.stringifyUrl({
    url: `${baseUrl}/api/people`,
    query: {
      search: query.search,
      per_page: query.perPage || 8,
      page: query.page || 1,
    },
  });
  const peopleData = (await fetch(url).then((res) => res.json())) as {
    data: Array<Person>;
    pagination: PaginationAttributes;
  };
  return {
    pagination: peopleData.pagination,
    data: peopleData.data?.map((apiEmployee) => ({
      ...apiEmployee,
      photo: apiEmployee.photo ? baseUrl + apiEmployee.photo : undefined,
    })),
  };
};
