import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import styleDefault from './verticalalign.style.css';

/**
 * Component to align several elements on the left using flexbox
 *
 * @element ux-verticalalign
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 */

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="js-container c-verticalalign">
                    <slot></slot>
                </div>`;

export default class VerticalAlignBase extends BaseShadowComponent {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}
