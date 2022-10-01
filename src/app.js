import Fastify from 'fastify';
import { getDB, saveDB } from './utils/db/index.js';
import { v4 } from 'uuid';

const prefix = '/api';

export async function build () {
  // initialize fastify
  const fastify = Fastify({ logger: true });

  fastify.get(prefix, async (request, reply) => {
    return { success: true };
  });

  // create todo
  fastify.post(`${prefix}/todo`, async (request, reply) => {
    const { body } = request;
    const { title, description, isDone = false } = body;
    const db = await getDB();

    const id = v4();

    const todo = {
      title,
      description,
      isDone,
      createdDate: new Date().getTime(),
      updatedDate: new Date().getTime()
    };

    db.todos[id] = todo;

    await saveDB(db);

    /**
     * const newObj = {
     *   id
     * }
     *
     * for (const key in todo) {
     *   newObj[key] = todo[key]
     * }
     *
     * return newObj
     */
    return {
      id,
      ...todo
    };
  });

  return fastify;
}
