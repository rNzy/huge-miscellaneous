import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import Background from '../../../mixins/styles/background.mixin';

const Base = Background(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-card-tile js-container"><slot></slot></div>`;

import styleDefault from './card-tile.style.css';

class CardTile extends Base {
  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    if (!this.hasAttribute('space-v')) this.setAttribute('space-v', 'xs');
  }
}

window.customElements.define('bux2-card-tile', CardTile);
