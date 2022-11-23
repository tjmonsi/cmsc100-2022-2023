import { changeUrl } from './change-url.js';
import { state } from '../../worker/index.js';

export async function redirectIfLoggedIn () {
  const userIsLoggedIn = await state.get('user-is-logged-in');
  if (
    userIsLoggedIn ||
    // will check backend if session exists
    (await window.fetch('/api/auth-check')).status === 200) {
    // go to todos;
    await state.set('user-is-logged-in', true);
    return changeUrl('/todos');
  }

  await state.set('user-is-logged-in', false);
}
