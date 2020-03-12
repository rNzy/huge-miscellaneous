import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import BreakpointMixin from '../../../mixins/dom/breakpoint.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin.js';

const Base = AriaHiddenStyleMixin(
  BreakpointMixin(StackMixin(BaseShadowComponent))
);

import styleDefault from './datalisting.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div role="table" aria-describedby="caption_description" class="c-datalisting">
  <div id="caption_description" class="a11y-hidden"></div>
  <div class="c-datalisting__thead" role="rowgroup">
      <slot name="thead"></slot>
  </div>
  <div class="c-datalisting__tbody" role="rowgroup">
    <slot name="tbody"></slot>
  </tbody>
</div>
`;

/**
 * @element bux2-datalisting
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 * @property {String} caption - to label the data table for accessibility purpose
 *
 */

export class datalisting extends Base {
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

    if (this.caption) {
      this.captionElement.textContent = this.caption;
      this.removeAttribute('aria-hidden');
    } else {
      this.captionElement.textContent = '';
      this.captionElement.setAttribute('aria-hidden', 'true');
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('space-v')) this.setAttribute('space-v', 'sm');
  }
}

window.customElements.define('bux2-datalisting', datalisting);
