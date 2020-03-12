import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

import styleDefault from './input-w-label.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div id="wrap">
<slot name="label-top"></slot>
<div id="wrap-input">
  <div id="label-left-wrap"><slot name="label-left"></slot></div>
  <slot></slot>
  <div id="label-right-wrap"><slot name="label-right"></slot></div>
</div>
<slot name="label-bottom"></slot>
<slot name="error"></slot>
</div>`;

export default class InputWLabel extends BaseShadowComponent {
  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
  }

  template() {
    return tpl;
  }
}

customElements.define('bux2-input-w-label', InputWLabel);
