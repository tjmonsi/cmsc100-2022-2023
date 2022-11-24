import { getDB } from '../../utils/db/index.js';

export const getManyTodo = async (request, reply) => {
  const { query, username } = request;
  const { limit = 5 } = query;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest();
  }

  const db = await getDB();

  const list = [];

  const todos = Object
    .entries(db.todos)
    .map(function ([id, todo]) {
      return {
        id,
        ...todo
      };
    })
    .sort(function (todo1, todo2) {
      return todo2.createdDate - todo1.createdDate;
    })
    .filter((todo) => (username === todo.username));

  for (const todo of todos) {
    list.push(todo);
    if (list.length >= limit) {
      break;
    }
  }

  return list;
};
