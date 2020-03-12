import InputTextBase from '../../../../core/components/formulaires/inputs/input-text.component.js';
import styleDefault from './input.style.css';

/**
 * Composant affichant un champ de type text.
 */
class InputText extends InputTextBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-text', InputText);
