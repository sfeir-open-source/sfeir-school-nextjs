import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

export default fp(async function delayPreHandler(fastify: FastifyInstance) {
  fastify.addHook('preHandler', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
  });
});
