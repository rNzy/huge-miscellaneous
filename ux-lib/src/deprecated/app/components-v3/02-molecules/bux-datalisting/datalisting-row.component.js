import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './datalisting-row.style.css';

const tpl = document.createElement('template');
tpl.innerHTML =
  '<div class="js-container c-data-listing-row"><slot><slot></div>';

/**
 * @element bux2-datalisting-row
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 *
 */

export class datalistingRow extends Base {
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
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'tbody');
    if (!this.hasAttribute('role')) this.setAttribute('role', 'row');

    Array.from(this.children).forEach(cell => {
      cell.setAttribute('role', 'cell');
    });
  }
}

window.customElements.define('bux2-datalisting-row', datalistingRow);
