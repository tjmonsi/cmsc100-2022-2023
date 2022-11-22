import { getDB } from '../../utils/db/index.js';

export const getTodo = async (request, reply) => {
  const { params, username } = request;
  const { todoId: id } = params;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  const { todos } = db;

  if (!todos[id]) {
    return reply.notFound();
  }

  if (todos[id].username !== username) {
    return reply.forbidden('You are not the owner of the todo');
  }

  return {
    id,
    ...todos[id]
  };
};
