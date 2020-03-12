import CardFooterBase from './../../../../core/components/structures/card/card-footer.component';
import styleDefault from './card-footer.style.css';

/**
 * Elément d'interface servant de footer dans l'élément ux-card,
 * on y retrouvera généralement des boutons.
 */
class CardFooter extends CardFooterBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-card-footer', CardFooter);
