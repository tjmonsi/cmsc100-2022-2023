import { getDB, saveDB } from '../../utils/db/index.js';

export const updateTodo = async (request, reply) => {
  const { params, body, username } = request;
  const { todoId: id } = params;
  const { title, description, isDone = null } = body;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  if (db.todos[id].username !== username) {
    return reply.forbidden('You are not the owner of the todo');
  }

  db.todos[id].title = title || db.todos[id].title;
  db.todos[id].description = description || db.todos[id].description;
  db.todos[id].isDone = isDone != null ? isDone : db.todos[id].isDone;
  db.todos[id].updatedDate = new Date().getTime();

  await saveDB(db);

  return {
    id,
    ...db.todos[id]
  };
};
