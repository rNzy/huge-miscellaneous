import GridBase from '../../../../core/components/structures/grid/grid.component';
import styleDefault from './grid.style.css';

/**
 * This is a simple text
 */
class Grid extends GridBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-grid', Grid);
