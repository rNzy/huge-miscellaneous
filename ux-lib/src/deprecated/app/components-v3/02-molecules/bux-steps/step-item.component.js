// @todo dans le constructeur il faut virer le this.label = this.querySelector('bux2-text');
// car c'est trop spécifique.
import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin.js';

const Base = AriaHiddenStyleMixin(BaseShadowComponent);

import styleDefault from './step-item.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-step-item js-container">
  <div class="c-step-item__number js-step-number" aria-hidden="true"></div>
  <slot></slot>
  <span class="a11y-hidden"></span>
</div>
`;

/**
 * @element bux2-step-item
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @slot default/unnamed slot
 *
 */

export class StepItem extends Base {
  static get properties() {
    return {
      step: {
        type: 'number'
      },
      active: {
        type: 'boolean'
      },
      checked: {
        type: 'boolean'
      },
      a11yLabel: {
        type: 'string'
      }
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
    this.stepNumber = this.$.querySelector('.js-step-number');
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.label = this.querySelector('bux2-text');
    if (this.label) {
      this.label.setAttribute('center', '');
      this.label.setAttribute('aria-hidden', 'true');
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'step':
        this.stepNumber.textContent = this.step;
        break;
      case 'active':
        if (this.hasAttribute('active')) {
          this.stepNumber.classList.add('is-active');
        } else {
          this.stepNumber.classList.remove('is-active');
        }
        break;
      case 'checked':
        if (
          this.hasAttribute('checked') &&
          this.getAttribute('checked') !== 'false'
        ) {
          this.container.classList.add('is-checked');
        } else {
          this.container.classList.remove('is-checked');
        }
        break;
      case 'a11y-label':
        if (this.a11yLabel && this.active) {
          this.$.querySelector('.a11y-hidden').innerHTML = this.a11yLabel;
        } else {
          this.$.querySelector('.a11y-hidden').innerHTML = '';
        }
    }
  }
}

window.customElements.define('bux2-step-item', StepItem);
