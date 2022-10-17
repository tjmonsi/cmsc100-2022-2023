import { paths } from './paths/index.js';
import { components } from './components/index.js';

export const specification = {
  openapi: '3.0.0',
  info: {
    title: 'Todo App',
    version: '0.0.1'
  },
  paths,
  components,
  security: [
    {
      cookieAuth: []
    }
  ]
};
