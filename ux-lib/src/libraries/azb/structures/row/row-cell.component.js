import RowCellBase from '../../../../core/components/structures/row/row-cell.component';
import styleDefault from './row-cell.style.css';

/**
 * This is a simple text
 */
class RowCell extends RowCellBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-row-cell', RowCell);
