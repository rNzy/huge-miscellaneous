import InputPasswordBase from '../../../../core/components/formulaires/inputs/input-password.component';
import styleDefault from './input.style.css';

/**
 * Composant affichant un champ de type password.
 */
class InputPassword extends InputPasswordBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-password', InputPassword);
