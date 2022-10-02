import { general } from './general/index.js';
import { createTodo } from './todos/create-todo.js';
import { deleteTodo } from './todos/delete-todo.js';
import { getManyTodo } from './todos/get-many-todo.js';
import { getTodo } from './todos/get-todo.js';
import { updateTodo } from './todos/update-todo.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

  general = general
  createTodo = createTodo
  deleteTodo = deleteTodo
  getManyTodo = getManyTodo
  getTodo = getTodo
  updateTodo = updateTodo
}
