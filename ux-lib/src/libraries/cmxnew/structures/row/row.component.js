import RowBase from '../../../../core/components/structures/row/row.component';
import styleDefault from './row.style.css';

/**
 * Crée une ligne en display:flex dont le dernier enfant s'étend dans la place restante.
 */
class Row extends RowBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-row', Row);
