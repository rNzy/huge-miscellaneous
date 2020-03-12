import CardBase from './../../../../core/components/structures/card/card.component';
import NoPaddingMixin from './../../../../core/mixins/styles/noPadding.mixin';
import styleDefault from './card.style.css';

const Base = NoPaddingMixin(CardBase);
/**
 * Elément d'interface de type card. Il est le conteneur des composants
 * ux-card-header, ux-card-body, ux-card-footer; ceux-ci peuvent être optionnel.
 */
class Card extends Base {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-card', Card);
