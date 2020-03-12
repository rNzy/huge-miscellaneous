import LinkTileBase from '../../../../core/components/interactions/tile/link-tile.component';
import styleDefault from './link-tile.style.css';

/**
 * @class LinkTile
 * @extends {LinkTileBase}
 */
class LinkTile extends LinkTileBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-link-tile', LinkTile);
