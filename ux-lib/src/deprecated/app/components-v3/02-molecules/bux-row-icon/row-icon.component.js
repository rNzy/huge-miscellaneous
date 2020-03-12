import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import styleDefault from './row-icon.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container c-row-icon">
  <slot name="icon" class="c-row-icon__circle"></slot>
  <slot class="c-row-icon__content"></slot>
</div>
`;

export default class RowIcon extends BaseShadowComponent {
  // Remove this if you don't have template
  template() {
    return tpl;
  }

  // Style for this component
  // Remove this if you don't have style
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('bux2-row-icon', RowIcon);
