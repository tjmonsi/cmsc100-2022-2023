import { customElement, property } from 'lit/decorators.js';
import { LitNoShadow } from '../../utils/lit-no-shadow/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('todo-component')
class Page extends LitNoShadow {
  @property({ type: Object })
  todo = null

  render () {
    return template.bind(this)();
  }

  async submitTodo (event) {
    event.preventDefault();

    const { target: form } = event;

    const detail = {
      title: form.title.value,
      description: form.description.value,
      isDone: form.isDone.checked || false
    };

    // we want to dispatch this event
    this.dispatchEvent(new window.CustomEvent('submit-todo', { detail }));
  }
}

export { Page };
