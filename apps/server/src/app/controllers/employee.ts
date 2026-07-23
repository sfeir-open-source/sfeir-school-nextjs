import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

import type { EmployeeInput, FindEmployeesQuery, PartialEmployeeInput } from '../schema/employee';
import { createOne, deleteOneByIndex, findEmployeeIndexById, findEmployees, findOneByIndex, updateOneByIndex } from '../services/employee.service';

export const findAll = (request: FastifyRequest<{ Querystring: FindEmployeesQuery }>, reply: FastifyReply) =>
  reply.send(findEmployees(request.query));

export const findOne = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  if (request.employeeIndex === undefined) return;
  const employee = findOneByIndex(request.employeeIndex);
  return reply.code(200).send(employee);
};

export const deleteOne = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
  if (request.employeeIndex === undefined) return;
  deleteOneByIndex(request.employeeIndex);
  return reply.code(204).send();
};

export const create = (request: FastifyRequest<{ Body: EmployeeInput }>, reply: FastifyReply) => {
  try {
    const employee = createOne(request.body);
    return reply.code(201).send(employee);
  } catch (_) {
    return reply.code(500).send({ message: 'Internal server error' });
  }
};

export const updateOne = (request: FastifyRequest<{ Params: { id: string }; Body: PartialEmployeeInput }>, reply: FastifyReply) => {
  if (request.employeeIndex === undefined) return;
  try {
    const employee = updateOneByIndex(request.employeeIndex, request.body);
    return reply.code(200).send(employee);
  } catch (_) {
    return reply.code(500).send({ message: 'Internal server error' });
  }
};

export const verifyExistingEmployee = (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply,
  next: HookHandlerDoneFunction,
): void => {
  const employeeIndex = findEmployeeIndexById(request.params.id);
  if (employeeIndex === -1) {
    reply.status(404).send({ message: 'Employee not found' });
    return;
  }
  request.employeeIndex = employeeIndex;
  next();
};
