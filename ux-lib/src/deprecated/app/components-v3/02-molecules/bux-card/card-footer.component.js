import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import BackgroundMixin from '../../../mixins/styles/background.mixin';

const Base = BackgroundMixin(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-card-footer js-container"><slot></slot></div>`;

export default class CardFooter extends Base {
  constructor() {
    super();
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'card-footer');
  }
}
