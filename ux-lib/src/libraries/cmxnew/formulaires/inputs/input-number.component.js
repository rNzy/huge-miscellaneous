import InputNumberBase from '../../../../core/components/formulaires/inputs/input-number.component.js';
import styleDefault from './input.style.css';

/**
 * Composant affichant un champ de type number.
 */
class InputNumber extends InputNumberBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-number', InputNumber);
