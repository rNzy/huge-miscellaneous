import InputAmountBase from '../../../../core/components/formulaires/inputs/input-amount.component';
import styleDefault from './input.style.css';

/**
 * Composant, dérivé de l'ux-input-number, affichant un champ montant, positif ou négatif, avec sa devise.
 */
class InputAmount extends InputAmountBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-amount', InputAmount);
