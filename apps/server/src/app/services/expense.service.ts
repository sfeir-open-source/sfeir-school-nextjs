import db from '../../db/db.json';
import { Expense, FindExpensesQuery } from '../schema/expenses';
import { parsePositiveInt, parseSortOrder } from '../utils/query';

type SortableField = (typeof SORTABLE_FIELDS)[number];

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 15;
const SORTABLE_FIELDS = ['label', 'category', 'status', 'creationDate', 'updateDate', 'price'] as const;
const DEFAULT_SORT_BY: SortableField = 'creationDate';
const getSortValue = (expense: Expense, sortBy: SortableField): string | number => {
  return sortBy === 'price' ? expense.price.priceIncludingTax : expense[sortBy];
};

export const findPaginatedExpenses = (query: FindExpensesQuery) => {
  const page = parsePositiveInt(query.page, DEFAULT_PAGE);
  const pageSize = parsePositiveInt(query.per_page, DEFAULT_PAGE_SIZE);
  const employeeId = query.employeeId;
  const sortBy = SORTABLE_FIELDS.includes(query.sort_by as SortableField) ? (query.sort_by as SortableField) : DEFAULT_SORT_BY;
  const order = parseSortOrder(query.order);

  let expenses: Expense[] = [...db.expenses];

  if (employeeId) {
    expenses = expenses.filter(expense => expense.employeeId === employeeId);
  }

  expenses.sort((a, b) => {
    const valueA = getSortValue(a, sortBy);
    const valueB = getSortValue(b, sortBy);

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  return {
    items: expenses.slice((page - 1) * pageSize, page * pageSize),
    pageNumber: page,
    pageSize: pageSize,
    totalPage: Math.ceil(expenses.length / pageSize),
  };
};

export const findExpenseIndexById = (id: string): Expense | undefined => {
  return db.expenses.find(expense => expense.id === id);
};
