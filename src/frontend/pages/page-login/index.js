import { customElement } from 'lit/decorators.js';
import { LitPage } from '../../utils/lit-page/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('page-login')
class Page extends LitPage {
  render () {
    return template.bind(this)();
  }
}

export { Page };
