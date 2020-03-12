import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-card-header js-container"><slot></slot></div>';

/**
 * Elément d'interface servant de header dans l'élément ux-card,
 * on y retrouvera généralement le titre d'une card.
 *
 * @element ux-card-header
 *
 * @slot - défaut
 *
 * @export
 * @class CardHeaderBase
 * @extends {BaseShadowComponent, StackMixin}
 */

export default class CardHeaderBase extends Base {
  template() {
    return tpl;
  }
}
