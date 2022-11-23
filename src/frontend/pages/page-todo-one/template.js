import { html } from 'lit';
import '../../components/todo-component/index.js';

export function template () {
  return html`
    <style>
      .todo {
        display: flex;
        align-items: center;
        padding: 12px;
      }

      .todo * {
        flex: 1;
      }
    </style>
    

    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `
      : ''}
    <todo-component @submit-todo="${this.updateTodo}" .todo="${this.todo}"></todo-component>
  `;
}
