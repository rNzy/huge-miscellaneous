import TileOperationBase from '../../../../core/components/interactions/tile-operation/tile-operation.component';

/**
 * Ce composant affiche au format destkop trois cellules en ligne de cette forme :
 * 1 -       2       - 3
 * , avec la cellule 2 qui prend toute la place.
 * Au format mobile cela s'affiche sous la forme :
 * 1 - 3
 *   2
 * , avec la cellule 2 en dessous.
 * On voit ce composant dans virtualis.
 */
class TileOperation extends TileOperationBase {}

customElements.define('ux-tile-operation', TileOperation);
