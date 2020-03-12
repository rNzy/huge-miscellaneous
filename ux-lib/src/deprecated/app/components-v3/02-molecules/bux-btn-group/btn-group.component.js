import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-btn-group js-container" role="group">
<slot></slot>
</section>
`;

/**
 * @element bux2-btn-group
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 *
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

    switch (name) {
      case 'vertical':
        if (this.hasAttribute('vertical')) {
          this.container.classList.add('c-btn-group--vertical');
          if (!this.verticalSpace) this.verticalSpace = 'sm';
          const value = `var(--spacing-${this.verticalSpace})`;
          this._setStack(value);
        }
        break;
    }
  }
}
