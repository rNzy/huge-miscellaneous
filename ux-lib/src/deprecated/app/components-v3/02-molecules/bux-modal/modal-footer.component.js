import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const styleDefault = require('./modal-footer.style.css');

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-modal-footer"><slot></slot></div>`;

class ModalFooter extends BaseShadowComponent {
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

window.customElements.define('bux2-modal-footer', ModalFooter);
