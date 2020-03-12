import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

let CheckboxGroupCounter = 0;

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-checkbox-group js-container">
  <slot name="group-label"></slot>
  <slot></slot>
</section>`;

/**
 * Composant permettant de grouper des cases à cocher.
 *
 * @element ux-checkbox-group
 *
 * @slot group-label
 * @slot default
 *
 * @export
 * @class CheckboxGroupBase
 * @extends {BaseShadowComponent, StackMixin}
 */
export default class CheckboxGroupBase extends Base {
  template() {
    return tpl;
  }

  constructor() {
    super();
    this.count = CheckboxGroupCounter++;
  }

  connectedCallback() {
    this.setAttribute('role', 'group');
    this.setAttribute('aria-labelledby', 'group-checkbox-' + this.count);
    this.querySelector('[slot="group-label"]').id =
      'group-checkbox-' + this.count;
  }
}
