import { property } from 'lit/decorators.js';
import { LitElement } from 'lit';

export class LitPage extends LitElement {
  @property({ type: String })
  path = ''

  @property({ type: String })
  hash = ''

  @property({ type: String })
  query = ''

  @property({ type: Object })
  queryObject = null

  @property({ type: Object })
  paramObject = null

  createRenderRoot () {
    return this;
  }
}
