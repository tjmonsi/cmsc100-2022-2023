import { LitElement } from 'lit';

export class LitNoShadow extends LitElement {
  createRenderRoot () {
    return this;
  }
}
