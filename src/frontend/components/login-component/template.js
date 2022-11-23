import { html } from 'lit';

export function template () {
  return html`
  <style>
    form {
      display: block;
      width: 100%;
      max-width: 600px;
      padding: 10px;
    }

    form .label-input-group {
      display: block;
      padding: 10px;
    }

    form .flex-group {
      display: flex;
      padding: 10px;
      flex: 1;
    }

    form button {
      margin-right: 10px;
      margin-left: 10px;
    }
  </style>
  <form @submit=${this.login}>
    ${this.errorMessage
      // if this is an errorMessage
      ? html`
        <div class="flex-group">
          ${this.errorMessage}
        </div>
      `
      : ''}
    <div class="label-input-group">
      <label for="username">
        Username:
      </label>
      <input type="text" placeholder="username" id="username" name="username" required>
    </div>

    <div class="label-input-group">
      <label for="password">
        Password:
      </label>
      <input type="password" placeholder="password" id="password" name="password" required>
    </div>

    <div class="flex-group">
      <button>
        Login
      </button>
      <span>
        Not registered? <a href="/register">Register Here</a>
      </span>
    </div>
    
  </form>
  `;
}
