import TileBase from '../../../../core/components/interactions/tile/tile.component';
import styleDefault from './tile.style.css';

/**
 * Permet de créer une tuile, et de lui ajouter une couleur ou une image d'arrière-plan.
 */
class Tile extends TileBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-tile', Tile);
