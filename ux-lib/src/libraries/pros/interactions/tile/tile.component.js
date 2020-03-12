import TileBase from '../../../../core/components/interactions/tile/tile.component';
import styleDefault from './tile.style.css';

/**
 * @class Tile
 * @extends {TileBase}
 */
class Tile extends TileBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-tile', Tile);
