import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './footer.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<footer class="c-footer"><slot></slot></footer>`;

/**
 * @export
 * @class FooterBase
 * @extends {BaseShadowComponent}
 *
 * @slot - défaut
 */
export default class FooterBase extends BaseShadowComponent {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }
}
