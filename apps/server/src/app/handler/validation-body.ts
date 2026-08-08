import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { type BaseIssue, type BaseSchema, type InferOutput, safeParse } from 'valibot';

export const validationBody =
  <TSchema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(schema: TSchema) =>
  (request: FastifyRequest<{ Body: InferOutput<TSchema> }>, reply: FastifyReply, next: HookHandlerDoneFunction) => {
    const result = safeParse(schema, request.body);
    console.log('request.body', request.body);
    if (!result.success) {
      const errors = result.issues.reduce<Record<string, string>>((acc, issue) => {
        const key = issue.path?.map(item => String(item.key)).join('.') || issue.type;
        acc[key] = issue.message;
        return acc;
      }, {});
      return reply.status(400).send({ message: 'Validation failed', errors });
    }
    request.body = result.output;
    return next();
  };
