import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './tile-operation.style.css';
import FocusableMixin from '../../../../core/mixins/styles/focusable.mixin';

const Base = FocusableMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="js-container c-tile-operation">
  <div class="c-tile-operation-items">
    <slot name="1"></slot><slot name="2"></slot><slot name="3"></slot>
  </div>
  <slot></slot>
</div>

`;

/**
 * Ce composant affiche au format destkop trois cellules en ligne de cette forme :
 * 1 -       2       - 3
 * , avec la cellule 2 qui prend toute la place.
 * Au format mobile cela s'affiche sous la forme :
 * 1 - 3
 *   2
 * , avec la cellule 2 en dessous.
 * On voit ce composant dans virtualis.
 *
 * @element ux-tile-operation
 *
 * @slot - 1
 * @slot - 2
 * @slot - 3
 * @slot - default
 *
 * @export
 * @class TileOperationBase
 * @extends {BaseShadowComponent, FocusableMixin}
 */
export default class TileOperationBase extends Base {
  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}
