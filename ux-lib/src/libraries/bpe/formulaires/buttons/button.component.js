import ButtonBase from '../../../../core/components/formulaires/buttons/button.component';
import styleDefault from './button.style.css';

/**
 * This is a simple button
 */
class Button extends ButtonBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-btn', Button);
