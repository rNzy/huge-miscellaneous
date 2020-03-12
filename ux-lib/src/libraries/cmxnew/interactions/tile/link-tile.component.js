import LinkTileBase from '../../../../core/components/interactions/tile/link-tile.component';
import styleDefault from './link-tile.style.css';

/**
 * Permet de créer une tuile cliquable et de lui appliquer une couleur ou une image d'arrière-plan.
 */
class LinkTile extends LinkTileBase {
  static get style() {
    return styleDefault.toString();
  }
}
customElements.define('ux-link-tile', LinkTile);
