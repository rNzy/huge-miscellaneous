import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';
import BackgroundMixin from '../../../mixins/styles/background.mixin';
import SlotChange from '../../../mixins/dom/slotchange.mixin';

const Base = BackgroundMixin(SlotChange(BaseShadowComponent));

import styleDefault from './key-value-item.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
  <div class="js-container c-key-value-item__wrapper">
    <div class="c-key-value-item">
      <div class="c-key-value-item__slot">
        <slot name="key"></slot>
      </div>
      <div class="c-key-value-item__slot">
        <slot name="value"></slot>
      </div>
    </div>
    <slot name="link"></slot>
  </div>`;

export default class KeyValueItem extends Base {
  static get properties() {
    return {
      level: {
        type: 'number'
      }
    };
  }

  // Style for this component
  // Remove this if you don't have style
  static get style() {
    return styleDefault.toString();
  }

  // Remove this if you don't have template
  template() {
    return tpl;
  }

  constructor() {
    super();
    this._setValueSlottedElements = this._setValueSlottedElements.bind(this);
    this.addEventListener('bux-slot-change', this._setValueSlottedElements);
  }

  _setValueSlottedElements() {
    this.querySelectorAll('[slot="value"]').forEach(slot => {
      if (!slot.hasAttribute('theme')) slot.setAttribute('theme', 'dark');
      if (!slot.hasAttribute('right')) slot.setAttribute('right', '');
    });
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._setValueSlottedElements();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('bux-slot-change', this._setValueSlottedElements);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'level':
        if (this.level > 1) {
          this.container.classList.add(`c-level--${this.level}`);
        }
        break;
      case 'background':
      case 'background-light':
        if (this.hasAttribute('background')) {
          this.container.classList.add('c-key-value-item--background');
        } else {
          this.container.classList.add('c-key-value-item--background');
        }
        break;
    }
  }
}

customElements.define('bux2-key-value-item', KeyValueItem);
