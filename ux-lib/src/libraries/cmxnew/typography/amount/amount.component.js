import AmountBase from '../../../../core/components/typography/amount/amount.component';

import styleDefault from './amount.style.css';

/**
 * Composant permettant d'afficher des montants, positifs ou négatifs, avec leur devise.
 */
class Amount extends AmountBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-amount', Amount);
