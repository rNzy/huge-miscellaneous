import RowBase from '../../../../core/components/structures/row/row.component';
import styleDefault from './row.style.css';

/**
 * This is a simple row of content
 */
class Row extends RowBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-row', Row);
