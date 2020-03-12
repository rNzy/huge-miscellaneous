import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin.js';
import SlotChange from '../../../mixins/dom/slotchange.mixin';

const Base = SlotChange(StackMixin(BaseShadowComponent));

// Remove this if you don't have style
import styleDefault from './section.style.css';

/**
 * Accordion container
 *
 * @element bux2-section
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @extends {SlotChange} base component to declare shadow dom
 * @extends {StackMixin} [space={xs|sm|md|lg|xl}]
 * @slot default/unnamed slot
 */

export class Section extends Base {
  static get properties() {
    return {
      tag: { type: 'string' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this._handleSlotChange = this._handleSlotChange.bind(this);
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

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._handleSlotChange();
    this.addEventListener('bux-slot-change', this._handleSlotChange);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('bux-slot-change', this._handleSlotChange);
  }

  template() {
    const tag = this.tag || 'div';
    const tpl = document.createElement('template');
    tpl.innerHTML = `<${tag} class="js-container"><slot></slot></${tag}>`;
    return tpl;
  }
}

window.customElements.define('bux2-section', Section);
