import { HeadingBase } from './../../../../core/components/typography/heading/heading.component';
import styleDefault from './heading.style.css';

/**
 * Permet de créer un élément titre pré-stylisé pouvant afficher un titre et un bouton.
 */
class Heading extends HeadingBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-heading', Heading);
