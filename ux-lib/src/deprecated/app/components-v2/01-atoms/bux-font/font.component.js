import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const tpl = document.createElement('template');
tpl.innerHTML = `<span class="js-container c-text"><slot></slot></span>`;

import styleDefault from './font.style.css';

export class Font extends BaseShadowComponent {
  static get properties() {
    return {
      size: { type: 'string', attributeName: 'data-size' },
      bold: { type: 'boolean' },
      italic: { type: 'boolean' },
      underline: { type: 'boolean' },
      uppercase: { type: 'boolean' },
      color: { type: 'string', attributeName: 'data-color' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'data-size':
        this._setSize();
        break;
      case 'bold':
        this._setBold();
        break;
      case 'italic':
        this._setItalic();
        break;
      case 'underline':
        this._setUnderline();
        break;
      case 'uppercase':
        this._setUppercase();
        break;
      case 'data-color':
        this._setColor();
        break;
    }
  }

  _setSize() {
    switch (this.size) {
      case 'xs':
      case 'sm':
      case 'md':
      case 'lg':
      case 'xl':
        this.container.classList.add('c-text--' + this.size);
        break;
      // default:
    }
  }

  _setBold() {
    if (this.bold) {
      this.container.classList.add('c-text--bold');
    } else {
      this.container.classList.remove('c-text--bold');
    }
  }

  _setItalic() {
    if (this.italic) {
      this.container.classList.add('c-text--italic');
    } else {
      this.container.classList.remove('c-text--italic');
    }
  }

  _setUnderline() {
    if (this.underline) {
      this.container.classList.add('c-text--underline');
    } else {
      this.container.classList.remove('c-text--underline');
    }
  }

  _setUppercase() {
    if (this.uppercase) {
      this.container.classList.add('c-text--uppercase');
    } else {
      this.container.classList.remove('c-text--uppercase');
    }
  }

  _setColor() {
    this.container.classList.remove(
      'c-text--color-part',
      'c-text--color-pro',
      'c-text--color-success',
      'c-text--color-error'
    );
    this.container.style.color = '';
    switch (this.color) {
      case 'part':
      case 'pro':
      case 'success':
      case 'error':
        this.container.classList.add('c-text--color-' + this.color);
        break;
      default:
        var isHexColor = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.color);
        if (isHexColor) {
          this.container.style.color = this.color;
        }
    }
  }
}

window.customElements.define('bux2-font', Font);
