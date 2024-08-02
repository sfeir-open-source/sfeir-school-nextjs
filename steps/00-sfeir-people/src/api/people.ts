import { PaginationAttributes, Person } from '@/types';
import qs from 'query-string';

const baseUrl = process.env.API_BASE_URL;

const formatPersonObject = (apiPerson: Person): Person => ({
  ...apiPerson,
  photo: apiPerson.photo ? baseUrl + apiPerson.photo : undefined,
});

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
    data: peopleData.data?.map(formatPersonObject),
  };
};

export const findOne = async (id: string): Promise<Person> => {
  const url = `${baseUrl}/api/people/${id}`;
  const data = (await fetch(url).then((res) => res.json())) as Person;
  return formatPersonObject(data);
};

type PersonUpdate = {
  id: string;
  photo?: string;
  firstname?: string;
  lastname?: string;
  position?: string;
  entryDate?: string;
  birthDate?: string;
  gender?: string;
  email?: string;
  phone?: string;
  isManager?: boolean;
  manager?: string;
  managerId?: string;
};

export const updateOne = async (personData: PersonUpdate): Promise<Person> => {
  const url = `${baseUrl}/api/people/${personData.id}`;
  const data = (await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(personData),
    next: { tags: [personData.id] },
  }).then((res) => res.json())) as Person;
  return formatPersonObject(data);
};
