import InputMailBase from '../../../../core/components/formulaires/inputs/input-email.component.js';
import styleDefault from './input.style.css';

/**
 * Composant affichant un champ de type email.
 */
class InputMail extends InputMailBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-email', InputMail);
