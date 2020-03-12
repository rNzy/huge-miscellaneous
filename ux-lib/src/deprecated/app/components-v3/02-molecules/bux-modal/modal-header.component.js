import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const styleDefault = require('./modal-header.style.css');

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-modal-header js-container"><slot></slot></div>`;

class ModalHeader extends BaseShadowComponent {
  static get properties() {
    return {
      popin: {
        type: 'boolean'
      }
    };
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'popin':
        this._setStylePopin();
        break;
    }
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  _setStylePopin() {
    if (this.hasAttribute('popin'))
      this.container.classList.add('c-popin-header');
    else this.container.classList.remove('c-popin-header');
  }
}

window.customElements.define('bux2-modal-header', ModalHeader);
