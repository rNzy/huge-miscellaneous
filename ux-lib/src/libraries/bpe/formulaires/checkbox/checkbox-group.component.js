import CheckboxGroupBase from '../../../../core/components/formulaires/checkbox/checkbox-group.component';
import styleDefault from './checkbox-group.style.css';

/**
 * This is a checkbox group container
 */
class CheckboxGroup extends CheckboxGroupBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-checkbox-group', CheckboxGroup);
