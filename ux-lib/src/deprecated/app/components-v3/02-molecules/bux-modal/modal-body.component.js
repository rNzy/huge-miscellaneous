import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import BackgroundMixin from '../../../mixins/styles/background.mixin';

const Base = BackgroundMixin(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-modal-body js-container"><slot></slot></div>`;

import styleDefault from './modal-body.style.css';

class ModalBody extends Base {
  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}

window.customElements.define('bux2-modal-body', ModalBody);
