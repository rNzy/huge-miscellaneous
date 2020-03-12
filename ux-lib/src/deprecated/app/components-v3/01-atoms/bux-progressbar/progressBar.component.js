import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

import styleDefault from './progressBar.style.css';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-progress js-container">
  <div class="c-progress__bar c-progress__bar--primary js-pb-primary"
    role="progressbar"
    aria-valuemin="0"
    aria-valuemax="100">
  </div>
</div>
`;

/**
 * @element bux2-progressbar
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @property {Number} value
 * @attribute data-value
 *
 * @property {Number} valuePrimary
 * @attribute value-primary
 *
 * @property {Number} valueSecondary
 * @attribute value-secondary
 */
export class ProgressBar extends Base {
  static get properties() {
    return {
      value: {
        type: 'string'
      },
      valuePrimary: {
        type: 'string',
        attributeName: 'value-primary'
      },
      valueSecondary: {
        type: 'string',
        attributeName: 'value-secondary'
      },
      size: {
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
    this.progressBar = this.$.querySelector('.js-pb-primary');
    this.progressContainer = this.$.querySelector('.c-progress');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    switch (name) {
      case 'value':
      case 'value-primary':
        this._updateValuePrimary();
        break;
      case 'value-secondary':
        if (!this.progressBarSecondary) {
          const pbTemplate = document.createElement('template');
          pbTemplate.innerHTML = `
          <div class="c-progress__bar c-progress__bar--secondary js-pb-secondary"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100">
          `;
          this.progressContainer.appendChild(
            pbTemplate.content.cloneNode(true)
          );
          this.progressBarSecondary = this.$.querySelector('.js-pb-secondary');
        }
        this.progressBarSecondary.style.width = this.valueSecondary + '%';
        this.progressBarSecondary.setAttribute(
          'aria-valuenow',
          this.valueSecondary
        );
        break;
      case 'size':
        switch (this.size) {
          case 'xs':
          case 'sm':
          case 'md':
          case 'lg':
          case 'xl':
            this.container.classList.add('c-progress--' + this.size);
            break;
        }
    }
  }

  _updateValuePrimary() {
    const pbValue = this.value || this.valuePrimary;
    this.progressBar.style.width = pbValue + '%';
    this.progressBar.setAttribute('aria-valuenow', pbValue);
  }
}

window.customElements.define('bux2-progressbar', ProgressBar);
