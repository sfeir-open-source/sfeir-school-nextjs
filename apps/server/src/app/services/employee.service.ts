import db from '../../db/db.json';
import type {
  Employee,
  EmployeeInput,
  EmployeeSortKey,
  FindEmployeesQuery,
  PaginatedEmployeesResponse,
  PartialEmployeeInput,
} from '../schema/employee';
import { EMPLOYEE_SORT_KEYS } from '../schema/employee';
import { parsePositiveInt, parseSortOrder, type SortOrder } from '../utils/query';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 15;

type NonDateEmployeeSortKey = Exclude<EmployeeSortKey, 'entryDate' | 'birthDate'>;

export function findEmployees(query: FindEmployeesQuery): PaginatedEmployeesResponse {
  const page = parsePositiveInt(query.page, DEFAULT_PAGE);
  const pageSize = parsePositiveInt(query.per_page, DEFAULT_PAGE_SIZE);
  const search = query.search?.trim();
  const sortBy = parseSortKey(query.sort_by);
  const order = parseSortOrder(query.order);

  let employees: Employee[] = [...db.people];

  if (search) {
    employees = filterBySearch(employees, search);
  }

  if (sortBy) {
    employees = sortEmployees(employees, sortBy, order);
  }

  const totalPage = Math.ceil(employees.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const items = employees.slice(startIndex, startIndex + pageSize);

  return {
    items,
    pageNumber: page,
    pageSize,
    totalPage,
  };
}

export function findOneByIndex(index: number): Employee {
  return db.people[index];
}

export function deleteOneByIndex(index: number): void {
  db.people.splice(index, 1);
}

export function findEmployeeIndexById(id: string): number {
  return db.people.findIndex(employee => employee.id === id);
}

export function updateOneByIndex(index: number, employee: PartialEmployeeInput): Employee {
  const existingEmployee = db.people[index];
  db.people[index] = { ...existingEmployee, ...employee };
  return db.people[index];
}

export function createOne(employee: EmployeeInput): Employee {
  const newEmployee: Employee = {
    ...employee,
    photo: employee.photo || '',
    id: crypto.randomUUID(),
    entryDate: employee.entryDate,
    birthDate: employee.birthDate,
    gender: employee.gender || '',
    manager: employee.manager || '',
    managerId: employee.managerId || '',
  };
  db.people.push(newEmployee);
  return newEmployee;
}

function parseSortKey(value: string | undefined): EmployeeSortKey | undefined {
  if (!value || !isEmployeeSortKey(value)) {
    return undefined;
  }

  return value;
}

function isEmployeeSortKey(value: string): value is EmployeeSortKey {
  return (EMPLOYEE_SORT_KEYS as readonly string[]).includes(value);
}

function filterBySearch(employees: Employee[], search: string): Employee[] {
  const normalizedSearch = search.toLowerCase();

  return employees.filter(employee => `${employee.firstname} ${employee.lastname}`.toLowerCase().includes(normalizedSearch));
}

function sortEmployees(employees: Employee[], sortBy: EmployeeSortKey, order: SortOrder): Employee[] {
  return [...employees].sort((left, right) => {
    const comparison = compareEmployeeValues(left, right, sortBy);
    return order === 'asc' ? comparison : -comparison;
  });
}

function compareEmployeeValues(left: Employee, right: Employee, sortBy: EmployeeSortKey): number {
  const leftValue = getComparableValue(left, sortBy);
  const rightValue = getComparableValue(right, sortBy);

  if (leftValue < rightValue) {
    return -1;
  }

  if (leftValue > rightValue) {
    return 1;
  }

  return 0;
}

function getComparableValue(employee: Employee, sortBy: EmployeeSortKey): string | number | boolean {
  if (sortBy === 'entryDate' || sortBy === 'birthDate') {
    return parseDdMmYyyy(employee[sortBy]).getTime();
  }

  return employee[sortBy as NonDateEmployeeSortKey];
}

function parseDdMmYyyy(value: string): Date {
  const [day, month, year] = value.split('/');
  return new Date(Number(year), Number(month) - 1, Number(day));
}
