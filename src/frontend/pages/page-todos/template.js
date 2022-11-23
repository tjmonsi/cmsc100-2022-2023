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
    <h2>
      Todos
    </h2>

    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `
      : ''}
    <div class="todo-list">
      ${this.todos.map(todo => html`
        <div class="todo">
          <a href="/todos/${todo.id}">
            ${todo.title}
          </a>
          <p>
            ${todo.description} - Created at: ${new Date(todo.createdDate)}
          </p>
          <p>
            Done: <input type="checkbox" .checked=${todo.isDone} id="${todo.id}" @click="${this.checkedTodo}">
          </p>
        </div>
      `)}
    </div>

    <todo-component @submit-todo="${this.createTodo}"></todo-component>
  `;
}
