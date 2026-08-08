import { FastifyInstance } from 'fastify';
import { findById, findExpenses } from '../controllers/expense';
import { GET_EXPENSE_BY_ID_DOCUMENTATION, GET_EXPENSES_DOCUMENTATION } from '../documentation/expense';

export default function expenseRoutes(fastify: FastifyInstance) {
  fastify.get('/api/expenses', {
    schema: GET_EXPENSES_DOCUMENTATION,
    handler: findExpenses,
  });
  fastify.get('/api/expenses/:id', {
    schema: GET_EXPENSE_BY_ID_DOCUMENTATION,
    handler: findById,
  });
}
