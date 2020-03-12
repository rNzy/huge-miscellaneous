import GridBase from '../../../../core/components/structures/grid/grid.component';
import styleDefault from './grid.style.css';

/**
 * Crée un élément CSS-grid. En vue mobile, tout passe sur une seule colonne.
 */
class Grid extends GridBase {
  static get style() {
    return styleDefault.toString();
  }
}

customElements.define('ux-grid', Grid);
