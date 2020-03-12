import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BreakpointMixin from '../../../mixins/dom/breakpoint.mixin';

const Base = BreakpointMixin(BaseShadowComponent);

import styleDefault from './card-scroller.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-card-scroller js-container">
<div class="c-card-scroller__wrapper">
<slot></slot>
</div>
</div>`;

class CardScroller extends Base {
  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this._defineLayout();
  }

  template() {
    return tpl;
  }

  _getAllItems() {
    return Array.from(this.children);
  }

  _defineLayout() {
    const items = this._getAllItems();

    items.forEach(item => {
      item.style.flexBasis = '16rem';
      item.style.minWidth = '16rem';
      item.style.marginRight = 'var(--spacing-sm)';
    });
  }
}

window.customElements.define('bux2-card-scroller', CardScroller);
