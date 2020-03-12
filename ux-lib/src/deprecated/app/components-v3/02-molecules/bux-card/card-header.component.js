import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-card-header"><slot></slot></div>`;

export default class CardHeader extends BaseShadowComponent {
  constructor() {
    super();
  }

  template() {
    return tpl;
  }
  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'card-header');
  }
}
