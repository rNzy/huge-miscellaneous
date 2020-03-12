import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';
import BackgroundMixin from '../../../mixins/styles/background.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';

const Base = BackgroundMixin(SlotChange(BaseShadowComponent));

import styleDefault from './key-value-edit-item.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
  <div class="js-container c-key-value-item__wrapper">
    <div class="c-key-value-edit-item">
      <div class="c-key-value-item__slot">
        <slot name="key"></slot>
      </div>
      <div class="c-key-value-item__value-slot">
        <slot name="value"></slot>
      </div>
    </div>
    <div class="c-key-value-edit-item__edit-slot">
      <slot name="edit"></slot>
    </div>
  </div>`;

export default class KeyValueEditItem extends Base {
  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.editSlotElement = this.$.querySelector(
      '.c-key-value-edit-item__edit-slot'
    );
    this._setValueSlottedElements = this._setValueSlottedElements.bind(this);
    this.addEventListener('bux-slot-change', this._setValueSlottedElements);
  }

  _setValueSlottedElements() {
    this.querySelectorAll('[slot="value"]').forEach(slot => {
      if (!slot.hasAttribute('theme')) slot.setAttribute('theme', 'dark');
    });
  }

  _multipleKeys() {
    // Test the number of elements slotted as key
    const multipleKeyItem = this.querySelectorAll('[slot=key]').length > 1;
    const keyContainer = this.$.querySelector('.c-key-value-edit-item');

    if (!multipleKeyItem) {
      return;
    } else {
      keyContainer.classList.add('c-key-value-edit-item__multiple');
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._setValueSlottedElements();
    if (!this.querySelector('[slot="edit"]')) {
      this.editSlotElement.setAttribute('aria-hidden', 'true');
    }

    this._multipleKeys();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('bux-slot-change', this._setValueSlottedElements);
  }

  template() {
    return tpl;
  }
}

customElements.define('bux2-key-value-edit-item', KeyValueEditItem);
