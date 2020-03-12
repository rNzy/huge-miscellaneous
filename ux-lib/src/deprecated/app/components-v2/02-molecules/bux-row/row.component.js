import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

import styleDefault from './row.styles.default.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container c-row">
  <slot></slot>
  <slot name="link"></slot>
</div>
`;

export class Row extends BaseShadowComponent {
  static get properties() {
    return {
      background: {
        type: 'boolean'
      },
      backgroundLight: {
        type: 'boolean',
        attributeName: 'background-light'
      },
      borderTop: {
        type: 'boolean',
        attributeName: 'border-top'
      },
      borderBottom: {
        type: 'boolean',
        attributeName: 'border-bottom'
      },
      borderFull: {
        type: 'boolean',
        attributeName: 'border-full'
      },
      marginBottom: {
        type: 'boolean',
        attributeName: 'margin-bottom'
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
    this._checkIfLink = this._checkIfLink.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (!this.container) return;
    switch (name) {
      case 'background':
        this._setbackground();
        break;
      case 'background-light':
        this._setbackgroundLight();
        break;
      case 'border-top':
        this._setborderTop();
        break;
      case 'border-bottom':
        this._setborderBottom();
        break;
      case 'border-full':
        this._setborderFull();
        break;
      case 'margin-bottom':
        this._setmarginBottom();
        break;
    }
  }

  connectedCallback() {
    this._slots.forEach(slot => {
      slot.addEventListener('slotchange', this._checkIfLink);
    });

    // If a div children has pushright attribute, push it to the right
    const children = this.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i].hasAttribute('push-right')) {
        children[i].setAttribute('style', 'margin-left: auto');
      }
    }
  }

  disconnectedCallback() {
    this._slots.forEach(slot => {
      slot.removeEventListener('slotchange', this._checkIfLink);
    });
  }

  _setbackground() {
    if (this.background) {
      this.container.classList.add('c-row--background');
    } else {
      this.container.classList.remove('c-row--background');
    }
  }

  _setbackgroundLight() {
    if (this.backgroundLight) {
      this.container.classList.add('c-row--background-light');
    } else {
      this.container.classList.remove('c-row--background-light');
    }
  }

  _setborderTop() {
    if (this.borderTop) {
      this.container.classList.add('c-row--border-top');
    } else {
      this.container.classList.remove('c-row--border-top');
    }
  }

  _setborderBottom() {
    if (this.borderBottom) {
      this.container.classList.add('c-row--border-bottom');
    } else {
      this.container.classList.remove('c-row--border-bottom');
    }
  }

  _setborderFull() {
    if (this.borderFull) {
      this.container.classList.add('c-row--border-full');
    } else {
      this.container.classList.remove('c-row--border-full');
    }
  }

  _setmarginBottom() {
    if (this.marginBottom) {
      this.container.classList.add('c-row--margin-bottom');
    } else {
      this.container.classList.remove('c-row--margin-bottom');
    }
  }

  _checkIfLink() {
    const linkEl = this.querySelector('bux2-link');
    if (linkEl) {
      this.querySelector('bux2-link').style.flex = '0 0 100%';
    }
  }
}

customElements.define('bux2-row', Row);
