import ButtonGroupBase from '../../../../core/components/formulaires/buttons/button-group.component';
import styleDefault from './button-group.style.css';

/**
 * This is a container to lay out buttons
 */
class ButtonGroup extends ButtonGroupBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-btn-group', ButtonGroup);
