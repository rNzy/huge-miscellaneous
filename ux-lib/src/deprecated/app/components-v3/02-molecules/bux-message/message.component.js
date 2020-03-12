import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

// Remove this if you don't have style
import styleDefault from './message.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
  <div class="js-container c-message">
    <slot class="c-message-icon" name="icon"></slot>
    <div class="c-message-content"><slot></slot></div>
  </div>`;

export default class Message extends BaseShadowComponent {
  // Style for this component
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

customElements.define('bux2-message', Message);
