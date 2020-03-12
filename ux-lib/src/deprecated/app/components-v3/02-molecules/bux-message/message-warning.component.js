import Message from './message.component';

// Remove this if you don't have style
import styleDefault from './message-warning.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container c-message">
    <bux2-svg class="c-message-icon" icon="warning" size="sm"></bux2-svg>
    <div class="c-message-content"><slot></slot></div>
</div>
`;

export default class MessageWarning extends Message {
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

customElements.define('bux2-message-warning', MessageWarning);
