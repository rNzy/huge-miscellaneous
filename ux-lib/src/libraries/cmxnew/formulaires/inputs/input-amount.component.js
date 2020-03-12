import InputAmount from '../../../../core/components/formulaires/inputs/input-amount.component.js';
import styleDefault from './input.style.css';

/**
 * Composant, dérivé de l'ux-input-number, affichant un champ montant, positif ou négatif, avec sa devise.
 */
class InputNumber extends InputAmount {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-input-amount', InputNumber);
