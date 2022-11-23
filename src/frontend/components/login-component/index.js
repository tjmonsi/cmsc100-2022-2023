import { customElement, property } from 'lit/decorators.js';
import { LitNoShadow } from '../../utils/lit-no-shadow/index.js';
import { changeUrl } from '../../utils/helpers/change-url.js';
import { state } from '../../worker/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('login-component')
class Component extends LitNoShadow {
  @property({ type: String })
  errorMessage = ''

  render () {
    return template.bind(this)();
  }

  // this is called when submit button is clicked (see template.js)
  async login (event) {
    // this prevents the page from using the default behavior
    // of form submit
    event.preventDefault();

    // gets the event.target and change the variable name to form
    const { target: form } = event;

    const username = form.username.value;
    const password = form.password.value;

    // calls an API call
    const response = await window.fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.status === 200) {
      this.errorMessage = '';
      await state.set('user-is-logged-in', true);
      return changeUrl('/todos');
    }

    const { message, error } = await response.json();
    this.errorMessage = `HTTP Code: ${response.status} - ${error} - ${message}`;
    await state.set('user-is-logged-in', false);
  }
}

export { Component };
