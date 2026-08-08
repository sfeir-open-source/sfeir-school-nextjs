import { boolean, check, email, InferInput, minLength, object, optional, partial, pipe, regex, string } from 'valibot';

const ddMmYyyyDate = pipe(
  string(),
  regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date must be in DD/MM/YYYY format'),
  check(value => {
    const [day, month, year] = value.split('/').map(Number);
    const parsed = new Date(year, month - 1, day);
    return parsed.getFullYear() === year && parsed.getMonth() === month - 1 && parsed.getDate() === day;
  }, 'Invalid date'),
);

export const employeeSchema = object({
  photo: optional(string()),
  firstname: pipe(string(), minLength(2, 'firstname must be at least 2 characters long')),
  lastname: pipe(string(), minLength(2, 'lastname must be at least 2 characters long')),
  position: pipe(string(), minLength(2, 'position must be at least 2 characters long')),
  entryDate: ddMmYyyyDate,
  birthDate: ddMmYyyyDate,
  gender: optional(string()),
  email: pipe(string(), email()),
  phone: pipe(string(), minLength(6, 'phone is required')),
  isManager: boolean(),
  manager: optional(string()),
  managerId: optional(string()),
});

export const partialEmployeeSchema = partial(employeeSchema);

export type EmployeeInput = InferInput<typeof employeeSchema>;
export type PartialEmployeeInput = InferInput<typeof partialEmployeeSchema>;

export interface Employee {
  id: string;
  photo: string;
  firstname: string;
  lastname: string;
  position: string;
  entryDate: string;
  birthDate: string;
  gender: string;
  email: string;
  phone: string;
  isManager: boolean;
  manager: string;
  managerId: string;
}

export const EMPLOYEE_SORT_KEYS = [
  'firstname',
  'lastname',
  'position',
  'entryDate',
  'birthDate',
  'email',
  'phone',
  'isManager',
  'manager',
] as const satisfies readonly (keyof Employee)[];

export type EmployeeSortKey = (typeof EMPLOYEE_SORT_KEYS)[number];

export interface FindEmployeesQuery {
  page?: string;
  per_page?: string;
  search?: string;
  sort_by?: string;
  order?: string;
}

export interface PaginatedEmployeesResponse {
  items: Employee[];
  pageNumber: number;
  pageSize: number;
  totalPage: number;
}
