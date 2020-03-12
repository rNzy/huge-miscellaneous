import LinkButtonBase from '../../../../core/components/formulaires/buttons/link-button.component';
import styleDefault from './button.style.css';

/**
 * Affiche un lien avec l'esthétique d'un bouton
 */
class LinkButton extends LinkButtonBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-link-btn', LinkButton);
