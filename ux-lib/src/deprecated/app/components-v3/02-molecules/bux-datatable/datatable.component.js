import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BreakpointMixin from '../../../mixins/dom/breakpoint.mixin';

const Base = BreakpointMixin(BaseShadowComponent);

import styleDefault from './datatable.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div role="table" aria-describedby="caption_description" class="c-datatable js-container">
  <div id="caption_description" class="c-datatable__caption"></div>
  <div class="c-datatable__thead" role="rowgroup">
      <slot name="thead"></slot>
  </div>
  <div class="c-datatable__tbody" role="rowgroup">
    <slot name="tbody"></slot>
  </tbody>
</div>
`;

/**
 * @element bux2-datatable
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 * @property {String} caption - to label the data table for accessibility purpose
 *
 */

export class DataTable extends Base {
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
    this.captionElement = this.shadowRoot.querySelector('#caption_description');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'caption':
        this.captionElement.textContent = this.caption;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('space-v')) this.setAttribute('space-v', 'sm');
  }
}

window.customElements.define('bux2-datatable', DataTable);
