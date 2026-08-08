import type { FastifyInstance } from 'fastify';
import { create, deleteOne, findAll, findOne, updateOne, verifyExistingEmployee } from '../controllers/employee';
import {
  CREATE_ONE_EMPLOYEE_DOCUMENTATION,
  DELETE_ONE_EMPLOYEE_DOCUMENTATION,
  GET_ALL_EMPLOYEES_DOCUMENTATION,
  GET_ONE_EMPLOYEE_DOCUMENTATION,
  UPDATE_ONE_EMPLOYEE_DOCUMENTATION,
} from '../documentation/employee';
import { validationBody } from '../handler/validation-body';
import { employeeSchema, partialEmployeeSchema } from '../schema/employee';

export default function employeeRoutes(fastify: FastifyInstance) {
  fastify.get('/api/people', {
    schema: GET_ALL_EMPLOYEES_DOCUMENTATION,
    handler: findAll,
  });
  fastify.get('/api/people/:id', {
    schema: GET_ONE_EMPLOYEE_DOCUMENTATION,
    handler: findOne,
    preHandler: [verifyExistingEmployee],
  });
  fastify.delete('/api/people/:id', {
    schema: DELETE_ONE_EMPLOYEE_DOCUMENTATION,
    handler: deleteOne,
    preHandler: [verifyExistingEmployee],
  });
  fastify.post('/api/people', {
    schema: CREATE_ONE_EMPLOYEE_DOCUMENTATION,
    preHandler: [validationBody(employeeSchema)],
    handler: create,
  });
  fastify.put('/api/people/:id', {
    schema: UPDATE_ONE_EMPLOYEE_DOCUMENTATION,
    preHandler: [verifyExistingEmployee, validationBody(partialEmployeeSchema)],
    handler: updateOne,
  });
}
