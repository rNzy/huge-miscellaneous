import InputDateBase from '../../../../core/components/formulaires/inputs/input-date.component';
import styleDefault from './input.style.css';

/**
 * Composant affichant un champ de type date.
 */
class InputDate extends InputDateBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-date', InputDate);
