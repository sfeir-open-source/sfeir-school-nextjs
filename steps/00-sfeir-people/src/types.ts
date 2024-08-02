export type Person = {
  id: string;
  photo?: string;
  firstname: string;
  lastname: string;
  position: string;
  entryDate: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  isManager: boolean;
  manager?: string;
  managerId?: string;
};

export type PaginationAttributes = {
  per_page?: number;
  page: number;
  total_pages: number;
};
