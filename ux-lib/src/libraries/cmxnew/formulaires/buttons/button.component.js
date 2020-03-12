import ButtonBase from '../../../../core/components/formulaires/buttons/button.component';
import styleDefault from './button.style.css';

/**
 * Composant qui permet d'afficher des boutons d'actions
 */
class Button extends ButtonBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-btn', Button);
