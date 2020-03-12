import CardBodyBase from './../../../../core/components/structures/card/card-body.component';
import styleDefault from './card-body.style.css';

/**
 * Elément d'interface servant de header dans l'élément ux-card,
 * on y retrouvera généralement le titre d'une card.
 */
class CardBody extends CardBodyBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-card-body', CardBody);
