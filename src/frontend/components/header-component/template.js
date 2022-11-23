import { html } from 'lit';

export function template () {
  return html`<header>
    <h1>
      Todo App
    </h1>

    <nav>
    ${this.loggedIn
      ? html`
        <a href="/logout">
          Logout
        </a>
      `
      : html`
        <a href="/login">
          Login
        </a>
      `}
    </nav> 
  </header>`;
}
