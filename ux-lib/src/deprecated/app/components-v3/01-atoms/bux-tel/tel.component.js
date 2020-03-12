import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './tel.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<span class="c-tel"><slot aria-hidden="true"></slot></span>`;

export class Tel extends Base {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    let ariaTel = this.innerHTML.replace(/ /g, '. ');
    this.shadowRoot.querySelector('.c-tel').setAttribute('aria-label', ariaTel);
  }
}

window.customElements.define('bux2-tel', Tel);
