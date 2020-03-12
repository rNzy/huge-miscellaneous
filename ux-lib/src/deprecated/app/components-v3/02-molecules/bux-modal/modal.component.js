import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './modal.style.css';

const KEYCODE = {
  ESCAPE: 27
};

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-modal js-container" aria-hidden="true" aria-modal="true" role="dialog">
  <slot name="modal-header"></slot>
  <button class="c-modal__close-btn js-close-btn" aria-label="fermer cette fenêtre de dialogue">
    <bux2-svg icon="cross" size="lg"></bux2-svg>
  </button>
  <slot name="modal-body"></slot>
  <slot name="modal-footer"></slot>
</section>
`;

export class Modal extends Base {
  static get properties() {
    return {
      open: {
        type: 'boolean'
      },
      popin: {
        type: 'boolean'
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
    this.closeBtn = this.$.querySelector('.js-close-btn');
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'open':
        this._openModal();
        break;
      case 'popin':
        this._setStylePopin();
        break;
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.closeBtn.addEventListener('click', this.handleClick);
    window.addEventListener('keyup', this.handleKeyDown);
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', '0');
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.closeBtn.removeEventListener('click', this.handleClick);
    window.removeEventListener('keyup', this.handleKeyDown);
  }

  handleClick() {
    this._closeModal();
  }

  handleKeyDown() {
    if (!this.open) {
      return;
    }
    if (event.altKey) return;

    switch (event.keyCode) {
      case KEYCODE.ESCAPE:
        this._closeModal();
        break;
      default:
        return;
    }
  }

  _openModal() {
    if (this.open) {
      this.style.display = 'block';
      this.container.classList.add('is-open');
      this.container.setAttribute('aria-hidden', 'false');
      this.focus();
    } else {
      this.style.display = 'flex';
      this.container.classList.remove('is-open');
      this.container.setAttribute('aria-hidden', 'true');
    }
  }

  _closeModal() {
    const overlay = document.querySelector('bux2-overlay');
    const focusBackEl = document.querySelector(
      `bux2-trigger-modal[modal-id="${this.id}"]`
    );

    // removing the 'open' attribute here  will trigger the attributeChangedCallback
    // using the _openModal method wich will remove the class .is-open et set
    // the aria-hidden attribute to true
    this.open = false;
    overlay.visible = false;
    focusBackEl.setAttribute('tabindex', '0');
    focusBackEl.focus();
    focusBackEl.removeAttribute('tabindex');
  }

  _setStylePopin() {
    if (this.hasAttribute('popin')) {
      this.container.classList.add('c-popin');
      let header = this.querySelector('bux2-modal-header');
      if (header) header.setAttribute('popin', 'true');
    } else this.container.classList.remove('c-popin');
  }
}

window.customElements.define('bux2-modal', Modal);
