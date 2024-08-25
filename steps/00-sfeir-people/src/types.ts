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

export type Expense = {
  id: string;
  employeeId: string;
  price: {
    priceIncludingTax: number;
    taxAmount: number;
    priceExludingTax: number;
    currency: string;
  };
  label: string;
  description: string;
  category: string;
  receiptLink: string;
  status: 'approved' | 'created' | 'declined';
};

export type PaginationAttributes = {
  per_page?: number;
  page: number;
  total_pages: number;
};
