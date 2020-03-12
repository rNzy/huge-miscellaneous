import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-card-footer js-container"><slot></slot></div>';

/**
 * Elément d'interface servant de footer dans l'élément ux-card,
 * on y retrouvera généralement des boutons.
 *
 * @element ux-card-footer
 *
 * @slot - défaut
 *
 * @export
 * @class CardFooterBase
 * @extends {BaseShadowComponent, StackMixin}
 */

export default class CardFooterBase extends Base {
  template() {
    return tpl;
  }
}
