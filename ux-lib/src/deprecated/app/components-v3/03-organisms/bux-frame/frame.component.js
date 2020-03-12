import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin.js';
import SlotChange from '../../../mixins/dom/slotchange.mixin';

const Base = SlotChange(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<section class="c-frame js-container"><slot></slot></section>`;

import styleDefault from './frame.style.css';

/**
 * Simple Frame container
 *
 * @element bux2-frame
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @extends {StackMixin} [space={xs|sm|md|lg|xl}]
 * @slot default/unnamed slot
 */

export class Frame extends Base {
  static get properties() {
    return {
      background: { type: 'string' },
      tag: { type: 'string' }
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
    this._handleSlotChange = this._handleSlotChange.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._handleSlotChange();
    this.addEventListener('bux-slot-change', this._handleSlotChange);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('bux-slot-change', this._handleSlotChange);
  }

  _handleSlotChange() {
    let value;
    if (this.verticalSpace) {
      value = `var(--spacing-${this.verticalSpace})`;
    }
    if (this.horizontalSpace) {
      value = `var(--spacing-${this.horizontalSpace})`;
    }
    this._setStack(value);
  }
}

window.customElements.define('bux2-frame', Frame);
