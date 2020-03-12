import Message from './message.component';

// Remove this if you don't have style
import styleDefault from './message-error.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container c-message">
    <bux2-svg class="c-message-icon" icon="cross-error" size="sm"></bux2-svg>
    <div class="c-message-content"><slot></slot></div>
</div>
`;

export default class MessageError extends Message {
  static get style() {
    return styleDefault.toString();
  }

  // Remove this if you don't have template
  template() {
    return tpl;
  }

  constructor() {
    super();
  }
}

customElements.define('bux2-message-error', MessageError);
