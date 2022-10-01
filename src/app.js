import Fastify from 'fastify';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.get('/api', async (request, reply) => {
    return { success: true };
  });

  return fastify;
}
