import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import { Service } from './services/index.js';
import { specification } from './specification/index.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(sensible);

  const service = new Service();

  const openAPIGlueOptions = {
    specification,
    service,
    prefix
  };

  const swaggerOptions = {
    openapi: specification,
    routePrefix: '/docs',
    exposeRoute: true
  };

  fastify.register(swagger, swaggerOptions);
  fastify.register(openAPIGlue, openAPIGlueOptions);

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
