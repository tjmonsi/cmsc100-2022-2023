import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const openAPIGlueOptions = {
    prefix
  };

  const swaggerOptions = {
    exposeRoute: true
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

  // fastify.get(prefix, general);

  // // create todo
  // fastify.post(`${prefix}/todo`, createTodo);

  // // get many todo
  // fastify.get(`${prefix}/todo`, getManyTodo);

  // // get one todo
  // fastify.get(`${prefix}/todo/:todoId`, getTodo);

  // // update one todo
  // fastify.put(`${prefix}/todo/:todoId`, updateTodo);

  // // delete one todo
  // fastify.delete(`${prefix}/todo/:todoId`, deleteTodo);

  return fastify;
}
