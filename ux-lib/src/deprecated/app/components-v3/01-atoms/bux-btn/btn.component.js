import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin.js';

const Base = BtnNoStyleMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<button class="c-btn js-container"><slot></slot></button>';

/**
 * Component to display buttons
 *
 * @element bux2-btn
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 */

export default class Btn extends Base {
  static get properties() {
    return {
      type: {
        type: 'string'
      },
      disabled: {
        type: 'boolean'
      },
      size: {
        type: 'string'
      },
      nostyle: {
        type: 'boolean'
      },
      a11yLabel: {
        type: 'string'
      }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._btn = this.$.querySelector('.c-btn');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'type':
        this._setType();
        break;
      case 'disabled':
        this._setDisabled();
        break;
      case 'size':
        this._setSize();
        break;
      case 'nostyle':
        this._setNoStyle();
        break;
      case 'a11y-label':
        this._setLabel();
        break;
    }
  }

  _setType() {
    switch (this.type) {
      case 'primary':
        this.container.classList.add('c-btn--primary');
        break;
      case 'secondary':
        this.container.classList.add('c-btn--secondary');
        break;
      case 'tertiary':
        this.container.classList.add('c-btn--tertiary');
        break;
    }
  }

  _setDisabled() {
    if (
      this.hasAttribute('disabled') &&
      this.getAttribute('disabled') !== 'false'
    ) {
      this.container.classList.add('c-btn--disabled');
      this._btn.setAttribute('disabled', 'true');
    } else {
      this.container.classList.remove('c-btn--disabled');
      this._btn.removeAttribute('disabled');
    }
  }

  _setSize() {
    switch (this.size) {
      case 'small':
        this.container.classList.add('c-btn--small');
        break;
      case 'medium':
        this.container.classList.add('c-btn--medium');
        break;
      case 'large':
        this.container.classList.add('c-btn--large');
        break;
    }
  }

  _setNoStyle() {
    if (this.hasAttribute('nostyle')) {
      this.container.classList.remove('c-btn');
      this.container.classList.add('m-btn-no-style');
    } else {
      this.container.classList.add('c-btn');
      this.container.classList.remove('m-btn-no-style');
    }
  }

  _setLabel() {
    if (this.hasAttribute('a11y-label'))
      this.container.setAttribute('aria-label', this.a11yLabel);
    else this.container.removeAttribute('aria-label');
  }
}
