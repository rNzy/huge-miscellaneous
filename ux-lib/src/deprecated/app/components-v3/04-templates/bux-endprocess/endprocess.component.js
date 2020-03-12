import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';

import styleDefault from './endprocess.style.css';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-endprocess js-container">
<slot></slot>
</section>
`;

/**
 * Component to display an end process template screen
 *
 * @element bux2-endprocess
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 */

export class EndProcess extends Base {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('space')) this.setAttribute('space-v', 'md');
  }
}

window.customElements.define('bux2-endprocess', EndProcess);
