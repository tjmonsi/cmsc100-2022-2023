import { html } from 'lit';
import { redirectIfLoggedIn } from './utils/helpers/redirect-if-logged-in.js';
import { redirectIfLoggedOut } from './utils/helpers/redirect-if-logged-out.js';

const router = document.querySelector('small-router');

export const routes = {
  '/': {
    /**
     * render function below is the same as
     * function () {
     *  return html`
     *    <page-home></page-home>
     *  `;
     * }
     *
     * This creates an html string to be rendered on the page
     */
    render: () => html`
      <page-home></page-home>
    `,
    // lazy-loads the page when the URL pattern is visited
    preRender: () => import('./pages/page-home/index.js')
  },
  '/login': {
    render: () => html`
      <page-login></page-login>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedIn,
      () => import('./pages/page-login/index.js')
    ]
  },
  '/todos': {
    render: () => html`
      <page-todos></page-todos>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/page-todos/index.js')
    ]
  },
  '/todos/:id': {
    render: () => html`
      <page-todo-one .paramObject=${router.paramObject}></page-todo-one>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/page-todo-one/index.js')
    ]
  },
  '/logout': {
    render: () => html`
      <page-logout></page-logout>
    `,
    // runs all scripts, if any one of the functions in the list fails
    preRender: [
      redirectIfLoggedOut,
      () => import('./pages/page-logout/index.js')
    ]
  }
};
