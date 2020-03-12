import CheckboxBase from '../../../../core/components/formulaires/checkbox/checkbox.component';
import styleDefault from './checkbox.style.css';

/**
 * Composant affichant une case à cocher.
 */
class Checkbox extends CheckboxBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-checkbox', Checkbox);
