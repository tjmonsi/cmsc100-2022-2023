import { customElement, property } from 'lit/decorators.js';
import { state } from '../../worker/index.js';
import { LitPage } from '../../utils/lit-page/index.js';
import { template } from './template.js';

/**
 * @type {LitPage}
 */
@customElement('page-todos')
class Page extends LitPage {
  @property({ type: Array })
  todos = []

  @property({ type: String })
  errorMessage = ''

  render () {
    return template.bind(this)();
  }

  async connectedCallback () {
    super.connectedCallback();

    const response = await window.fetch('/api/todo');

    if (response.status !== 200) {
      return this.setErrorMessage(await response.json(), response.status);
    }

    try {
      this.todos = await response.json();
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async createTodo (event) {
    event.preventDefault();

    // we get the data from the detail being sent by the todo-component
    const { detail } = event;

    const response = await window.fetch('/api/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(detail)
    });

    try {
      const data = await response.json();
      // appends the new object
      this.todos = [
        data,
        ...this.todos
      ];
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async checkedTodo (event) {
    const { target: checkbox } = event;

    // we cannot deconstruct the checkbox to get the variables
    // thus we need to do the old fashion way
    const id = checkbox.id;
    const isDone = checkbox.checked;

    const response = await window.fetch(`/api/todo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isDone
      })
    });

    try {
      if (response.status !== 200) {
        return this.setErrorMessage(await response.json(), response.status);
      } else {
        await response.json();
      }
    } catch (error) {
      return this.setErrorMessage(error, 404);
    }
  }

  async setErrorMessage (data, status) {
    const { message, error } = data;
    this.errorMessage = `HTTP Code: ${status} - ${error} - ${message}`;
    await state.set('user-is-logged-in', false);
  }
}

export { Page };
