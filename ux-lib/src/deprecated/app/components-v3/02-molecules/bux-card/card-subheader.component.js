import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-card-subheader"><slot></slot></div>`;

export default class CardSubheader extends BaseShadowComponent {
  constructor() {
    super();
  }

  template() {
    return tpl;
  }
}
