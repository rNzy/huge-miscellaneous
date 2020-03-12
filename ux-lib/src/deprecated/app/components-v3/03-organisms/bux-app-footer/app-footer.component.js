import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';

import styleDefault from './app-footer.style.css';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-appfooter js-container">
  <slot></slot>
</section>
`;

/**
 * App footer container
 *
 * @element bux2-appfooter
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @slot default/unnamed slot
 */

export class AppFooter extends Base {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
  }
}

window.customElements.define('bux2-appfooter', AppFooter);
