import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';
import ListMixin from '../../../mixins/aria/list.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(ListMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="js-container"><slot></slot></div>';

export default class KeyValue extends Base {
  // Remove this if you don't have template
  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('space-v')) this.setAttribute('space-v', 'xs');
  }
}

customElements.define('bux2-key-value', KeyValue);
