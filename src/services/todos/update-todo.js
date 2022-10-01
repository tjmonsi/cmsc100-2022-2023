import { getDB, saveDB } from '../../utils/db/index.js';

export const updateTodo = async (request, reply) => {
  const { params, body } = request;
  const { todoId: id } = params;
  const { title, description, isDone = null } = body;
  const db = await getDB();

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
