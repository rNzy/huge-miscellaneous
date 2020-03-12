import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import listMixin from '../../../mixins/aria/list.mixin';

const Base = listMixin(StackMixin(BaseShadowComponent));

import styleDefault from './list.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<ul class="c-list js-container"><slot></slot></ul>';

class List extends Base {
  static get properties() {
    return {
      bullet: { type: 'boolean' }
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

    if (name === 'bullet') {
      this.container.classList.add('c-list--bullet');
      Array.from(this.children).forEach(item => {
        item.style.display = 'list-item';
      });
    }
  }
}

window.customElements.define('bux2-list', List);
