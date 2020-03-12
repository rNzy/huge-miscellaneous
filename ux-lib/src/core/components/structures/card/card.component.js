import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-card js-container"><slot></slot></div>';

/**
 * Elément d'interface de type card. Il est le conteneur des composants
 * ux-card-header, ux-card-body, ux-card-footer; ceux-ci peuvent être optionnel.
 *
 * @element ux-card
 *
 * @slot - défaut
 *
 * @export
 * @class CardBase
 * @extends {BaseShadowComponent}
 */

export default class CardBase extends Base {
  template() {
    return tpl;
  }
}
