import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './header.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<header class="c-header"><slot name="header-logo"></slot><nav class="c-header__nav"><slot></slot></nav></header>`;

/**
 * @export
 * @class HeaderBase
 * @extends {BaseShadowComponent}
 *
 * @slot - défaut
 */
export default class HeaderBase extends BaseShadowComponent {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }
}
