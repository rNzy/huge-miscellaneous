import ButtonGroupBase from '../../../../core/components/formulaires/buttons/button-group.component';
import styleDefault from './button-group.style.css';

/**
 * Composant qui permet de grouper des boutons, et qui ajuste leur position au format mobile.
 */
class ButtonGroup extends ButtonGroupBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-btn-group', ButtonGroup);
