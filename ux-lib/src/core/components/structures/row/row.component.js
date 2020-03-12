import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="js-container c-row"><slot></slot></div>';

/**
* Crée une ligne en display:flex dont le dernier enfant s'étend dans la place restante.
* 
* @element ux-row
*
* @slot default

* @export
* @class RowBase
* @extends {BaseShadowComponent, StackMixin}
*/
export default class RowBase extends Base {
  template() {
    return tpl;
  }
}
