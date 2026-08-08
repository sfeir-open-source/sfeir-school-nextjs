type Price = {
  priceIncludingTax: number;
  taxAmount: number;
  priceExcludingTax: number;
  currency: string;
};

export type Expense = {
  id: string;
  employeeId: string;
  price: Price;
  label: string;
  description: string;
  category: string;
  receiptLink: string;
  status: string;
  creationDate: string;
  updateDate: string;
};

export type FindExpensesQuery = {
  page?: string;
  per_page?: string;
  employeeId?: string;
  sort_by?: string;
  order?: string;
};
