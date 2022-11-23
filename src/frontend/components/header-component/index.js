import { customElement, property } from 'lit/decorators.js';
import { state } from '../../worker/index.js';
import { LitNoShadow } from '../../utils/lit-no-shadow/index.js';
import { proxy } from 'comlink';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('header-component')
class Component extends LitNoShadow {
  @property({ type: Boolean })
  loggedIn = false

  render () {
    return template.bind(this)();
  }

  constructor () {
    super();
    // this ensures that we have set the scope of the function to this element
    this.boundSetLoggedIn = this.setLoggedIn.bind(this);
  }

  async connectedCallback () {
    super.connectedCallback();
    // this subscribes the function to listen when value on user-is-logged-in changes
    await state.subscribe('user-is-logged-in', 'header-component-user-is-logged-in', proxy(this.boundSetLoggedIn));

    this.loggedIn = await state.get('user-is-logged-in');
  }

  async disconnectedCallback () {
    // this unsubscribes the function when this component is deleted
    await state.unsubscribe('user-is-logged-in', 'header-component-user-is-logged-in');
  }

  setLoggedIn (value) {
    this.loggedIn = value;
  }
}

export { Component };
