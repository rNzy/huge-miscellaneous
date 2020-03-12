import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './trigger-modal.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<button class="c-trigger-modal js-trigger"><slot></slot></button>`;

export class TriggerModal extends Base {
  static get properties() {
    return {
      modalId: {
        type: 'string'
      },
      label: {
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
    this.triggerBtn = this.shadowRoot.querySelector('.js-trigger');
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.triggerBtn.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.triggerBtn.removeEventListener('click', this.handleClick);
  }

  handleClick() {
    this._triggermodal(this.modalId);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (this.triggerBtn) {
      this._setLabel();
    }
  }

  _triggermodal(id) {
    const modal = document.getElementById(id);
    const overlay = document.querySelector('bux2-overlay');

    modal.open = true;
    overlay.visible = true;
    overlay.setAttribute('modal-id', id);
  }

  _setLabel() {
    if (this.label) {
      this.triggerBtn.setAttribute('aria-label', this.label);
    } else {
      this.triggerBtn.removeAttribute('aria-label');
    }
  }
}

window.customElements.define('bux2-trigger-modal', TriggerModal);
