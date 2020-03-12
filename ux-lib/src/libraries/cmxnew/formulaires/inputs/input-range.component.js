import InputRangeBase from '../../../../core/components/formulaires/inputs/input-range.component.js';
import styleDefault from './input-range.style.css';

/**
 * Composant affichant un champ de type range.
 */
class InputRange extends InputRangeBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-range', InputRange);
