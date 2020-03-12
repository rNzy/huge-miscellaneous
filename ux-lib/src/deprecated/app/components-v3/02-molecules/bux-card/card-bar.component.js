import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BorderMixin from '../../../mixins/styles/border.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BorderMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-card-bar js-container"><slot></slot></div>`;

import styleDefault from './card-bar.style.css';

class CardBar extends Base {
  static get properties() {
    return {
      center: { type: 'boolean' }
    };
  }

  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    if (!this.container) return;

    switch (name) {
      case 'border-top':
        if (this.borderTop) {
          this.container.classList.add('c-card-bar--border-top');
        } else {
          this.container.classList.remove('c-card-bar--border-top');
        }
        break;
      case 'center':
        if (this.center) {
          this.container.classList.add('c-card-bar--center');
        } else {
          this.container.classList.remove('c-card-bar--center');
        }
        break;
    }
  }
}

window.customElements.define('bux2-card-bar', CardBar);
