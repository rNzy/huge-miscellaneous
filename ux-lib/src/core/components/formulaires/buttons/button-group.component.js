import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import StackMixin from '../../../../core/mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-btn-group js-container" role="group">
<slot></slot>
</section>
`;

/**
 * Composant qui permet de grouper des boutons, et qui ajuste leur position au format mobile.
 *
 * @element ux-btn-group
 *
 * @prop {Boolean} vertical - dispose les boutons verticalement
 *
 * @slot - default
 *
 * @export
 * @class BtnGroup
 * @extends {BaseShadowComponent, StackMixin}
 */
export default class BtnGroup extends Base {
  static get properties() {
    return {
      vertical: {
        type: 'boolean'
      }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'vertical') {
      if (this.vertical) {
        this.container.classList.add('c-btn-group--vertical');
      }
    }
  }
}
