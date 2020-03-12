import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './datatable-row.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-datatable-row">
  <slot><slot>
</div>
`;

/**
 * @element bux2-datatable-row
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 *
 */

export class DataTableRow extends Base {
  static get properties() {
    return {
      caption: { type: 'string' }
    };
  }
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this._defaultSlot = this.shadowRoot.querySelector('slot');
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'tbody');
    if (!this.hasAttribute('role')) this.setAttribute('role', 'row');

    this._defineCells();
  }

  __allCells() {
    return Array.from(this.children);
  }

  _defineCells() {
    const cells = this.__allCells();
    cells.forEach(cell => {
      if (!cell.hasAttribute('role')) cell.setAttribute('role', 'cell');
    });
  }
}

window.customElements.define('bux2-datatable-row', DataTableRow);
