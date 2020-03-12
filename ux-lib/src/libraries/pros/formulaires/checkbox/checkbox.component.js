import CheckboxBase from '../../../../core/components/formulaires/checkbox/checkbox.component';
import styleDefault from './checkbox.style.css';

/**
 * This is a simple button
 */
class Checkbox extends CheckboxBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-checkbox', Checkbox);
