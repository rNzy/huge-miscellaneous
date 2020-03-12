import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

import style from './pager.style.css';

const tpl = document.createElement('template');
tpl.innerHTML =
  '<nav class="c-pager js-container"><div role="list"><slot></slot></div></nav>';

/**
 * Element englobant pour créer un pager.
 *
 * @element ux-pager
 *
 * @slot default
 *
 * @export
 * @class PagerBase
 * @extends {BaseShadowComponent}
 */
export default class PagerBase extends BaseShadowComponent {
  static get style() {
    return style.toString();
  }

  template() {
    return tpl;
  }
}
