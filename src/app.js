import Fastify from 'fastify';
import sensible from '@fastify/sensible';
import openAPIGlue from 'fastify-openapi-glue';
import swagger from '@fastify/swagger';
import cookie from '@fastify/cookie';
import session from '@fastify/secure-session';
import jwt from '@fastify/jwt';
import { Service } from './services/index.js';
import { Security } from './security/index.js';
import { specification } from './specification/index.js';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });
  fastify.register(cookie);
  fastify.register(session, {
    secret: 'A very long string for the secret that should work',
    salt: '1234567890123456',
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60
    }
  });
  fastify.register(jwt, {
    secret: 'this is a very long string that will be used as a secret'
    /**
     * A more secured version - use RS256
     * secret: {
     *   private: 'private key'
     *   public: 'public key'
     * }
     * sign: { algorithm: 'RS256' }
     */
  });

  fastify.register(sensible);

  const service = new Service(fastify);
  const securityHandlers = new Security(fastify);

  const openAPIGlueOptions = {
    specification,
    service,
    securityHandlers,
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
