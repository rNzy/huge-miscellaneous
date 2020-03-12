import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './main.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<main><slot></slot></main>`;

/**
 * @export
 * @class MainBase
 * @extends {BaseShadowComponent}
 *
 * @slot - défaut
 */
export default class MainBase extends BaseShadowComponent {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }
}
