import { general } from './general/index.js';
import { todo } from './todo/index.js';
import { user } from './user/index.js';

export const paths = {
  ...general,
  ...todo,
  ...user
};
