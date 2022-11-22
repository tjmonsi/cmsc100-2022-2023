import { getDB, saveDB } from '../../utils/db/index.js';

export const deleteTodo = async (request, reply) => {
  const { params, username } = request;
  const { todoId: id } = params;
  const db = await getDB();

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  if (db.todos[id].username !== username) {
    return reply.forbidden('You are not the owner of the todo');
  }

  delete db.todos[id];

  await saveDB(db);

  return {
    success: true
  };
};
