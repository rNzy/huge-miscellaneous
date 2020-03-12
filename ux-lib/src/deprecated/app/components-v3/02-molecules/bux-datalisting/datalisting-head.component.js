import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BackgroundMixin from '../../../mixins/styles/background.mixin';

const Base = BackgroundMixin(BaseShadowComponent);

import styleDefault from './datalisting-head.style.css';

const tpl = document.createElement('template');
tpl.innerHTML =
  '<div class="js-container c-data-listing-head"><slot><slot></div>';

/**
 * @element bux2-datalisting-head
 *
 * @extends {Base} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 *
 */

export class datalistingHead extends Base {
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
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'thead');
    if (!this.hasAttribute('role')) this.setAttribute('role', 'row');

    Array.from(this.children).forEach(cell => {
      cell.setAttribute('role', 'columnheader');
      cell.setAttribute('aria-sort', 'none');
    });
  }
}

customElements.define('bux2-datalisting-head', datalistingHead);
