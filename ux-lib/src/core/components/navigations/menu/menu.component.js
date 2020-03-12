import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './menu.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<nav class="c-menu"><slot></slot></nav>`;

/**
 * @export
 * @class MenuBase
 * @extends {BaseShadowComponent}
 *
 * @slot - default
 */
export default class MenuBase extends BaseShadowComponent {
  template() {
    return tpl;
  }
  static get style() {
    return styleDefault.toString();
  }
}
