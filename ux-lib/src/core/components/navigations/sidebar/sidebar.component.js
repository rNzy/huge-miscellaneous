import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './sidebar.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-sidebar"><slot></slot></div>`;

/**
 *
 *
 * @export
 * @class SidebarBase
 * @extends {BaseShadowComponent}
 *
 * @prop {Boolean} open - la sidebar est elle ouverte ?
 */
export default class SidebarBase extends BaseShadowComponent {
  static get properties() {
    return {
      open: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }
}
