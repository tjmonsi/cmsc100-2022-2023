import { getDB } from '../../utils/db/index.js';

export const getTodo = async (request, reply) => {
  const { params } = request;
  const { todoId: id } = params;
  const db = await getDB();

  const { todos } = db;

  return {
    id,
    ...todos[id]
  };
};
