import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './overlay.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-overlay js-container"></div>`;

export class Overlay extends Base {
  static get properties() {
    return {
      visible: {
        type: 'boolean'
      },
      modalId: {
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
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.container.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.container.removeEventListener('click', this.handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    if (name === 'visible') this._showOverlay();
  }

  handleClick() {
    this._closeOverlay();
    this._closeModal();
  }

  _showOverlay() {
    if (this.visible)
      this.container.classList.add('is-visible');
    else this.container.classList.remove('is-visible');
  }

  _closeOverlay() {
    this.visible = false;
  }

  _closeModal() {
    document.getElementById(this.modalId).open = false;
  }
}

window.customElements.define('bux2-overlay', Overlay);
