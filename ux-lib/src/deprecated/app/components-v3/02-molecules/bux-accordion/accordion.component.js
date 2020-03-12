import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';

import styleDefault from './accordion.style.css';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-accordion js-container">
  <slot></slot>
</section>
`;

/**
 * Accordion container
 *
 * @element bux2-accordion
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @slot default/unnamed slot
 */

export class Accordion extends Base {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.verticalSpace) this.verticalSpace = 'sm';
  }
}

window.customElements.define('bux2-accordion', Accordion);
