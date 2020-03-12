import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

// Remove this if you don't have style
import styleDefault from './slider-item.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<slot></slot>`;

export default class SliderItem extends BaseShadowComponent {
  // Properties for this component
  static get properties() {
    return {
      active: {
        type: 'boolean',
        defaultValue: 'false'
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
    this.setAttribute('role', 'listitem');
  }

  // Remove this if you don't put code
  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'active') {
      if (this.active) {
        this.classList.add('c-slider-item__active');
        this.classList.remove('c-slider-item__unactive');
        this.removeAttribute('aria-hidden');
      } else {
        this.classList.remove('c-slider-item__active');
        this.classList.add('c-slider-item__unactive');
        this.setAttribute('aria-hidden', 'true');
      }
    }
  }
}

customElements.define('bux2-slider-item', SliderItem);
