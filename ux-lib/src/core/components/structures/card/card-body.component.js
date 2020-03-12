import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-card-body js-container"><slot></slot></div>';

/**
 * Elément d'interface servant de body dans l'élément ux-card,
 * on y retrouvera généralement le contenu de la card.
 *
 * @element ux-card-body
 *
 * @slot - défaut
 *
 * @export
 * @class CardBodyBase
 * @extends {BaseShadowComponent, StackMixin}
 */

export default class CardBodyBase extends Base {
  template() {
    return tpl;
  }
}
