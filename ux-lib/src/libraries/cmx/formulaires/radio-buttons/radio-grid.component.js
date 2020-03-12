import RadioGridBase from '../../../../core/components/formulaires/radio-buttons/radio-grid.component';

import styleDefault from './radio-grid.style.css';

/**
 * Composant affichant un bouton radio sous forme de grid.
 */
class RadioGrid extends RadioGridBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-radio-grid', RadioGrid);
