import { FastifyReply, FastifyRequest } from 'fastify';
import { FindExpensesQuery } from '../schema/expenses';
import { findExpenseIndexById, findPaginatedExpenses } from '../services/expense.service';

export const findExpenses = (request: FastifyRequest<{ Querystring: FindExpensesQuery }>, reply: FastifyReply) => {
  const expenses = findPaginatedExpenses(request.query);
  return reply.code(200).send(expenses);
};

export const findById = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  const expense = findExpenseIndexById(request.params.id);
  if (!expense) {
    return reply.code(404).send({ message: 'Expense not found' });
  }
  return reply.code(200).send(expense);
};
