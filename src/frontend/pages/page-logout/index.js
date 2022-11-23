import { customElement } from 'lit/decorators.js';
import { state } from '../../worker/index.js';
import { changeUrl } from '../../utils/helpers/change-url.js';
import { LitPage } from '../../utils/lit-page/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('page-logout')
class Page extends LitPage {
  async connectedCallback () {
    super.connectedCallback();

    // regardless if it fails or not on the backend we should logout
    await window.fetch('/api/logout');

    state.set('user-is-logged-in', false);
    changeUrl('/login');
  }

  render () {
    return template.bind(this)();
  }
}

export { Page };
