import { changeUrl } from './change-url.js';
import { state } from '../../worker/index.js';

export async function redirectIfLoggedOut () {
  const userIsLoggedIn = await state.get('user-is-logged-in');
  if (
    !userIsLoggedIn &&
    // will check backend if session doesn't exist
    (await window.fetch('/api/auth-check')).status !== 200) {
    // go to login;
    await state.set('user-is-logged-in', false);
    return changeUrl('/login');
  }

  await state.set('user-is-logged-in', true);
}
