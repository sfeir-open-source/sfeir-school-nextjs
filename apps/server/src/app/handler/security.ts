import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function (fastify: FastifyInstance) {
  fastify.addHook('preHandler', (request, reply, next) => {
    const apiKey = request.headers['x-api-key'];
    const backendApiKey = fastify.config.API_KEY;
    if (request.url.includes('documentation') || apiKey === backendApiKey) {
      return next();
    }
    return reply.status(401).send({ message: 'Unauthorized' });
  });
});
