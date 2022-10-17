import { general } from './general/index.js';
import { createTodo } from './todos/create-todo.js';
import { deleteTodo } from './todos/delete-todo.js';
import { getManyTodo } from './todos/get-many-todo.js';
import { getTodo } from './todos/get-todo.js';
import { updateTodo } from './todos/update-todo.js';
import { registerUser } from './user/register-user.js';
import { login } from './user/login.js';
import { logout } from './user/logout.js';

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

  // user functions
  registerUser = registerUser
  login = login
  logout = logout
}
