import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';
import BackgroundMixin from '../../../mixins/styles/background.mixin';

const Base = BackgroundMixin(SlotChange(StackMixin(BaseShadowComponent)));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-card-body js-container"><slot></slot></div>`;

export default class CardBody extends Base {
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

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('slot')) this.setAttribute('slot', 'card-body');
    this._handleSlotChange();
    this.addEventListener('bux-slot-change', this._handleSlotChange);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('bux-slot-change', this._handleSlotChange);
  }
}
