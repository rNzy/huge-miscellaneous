import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin.js';

const Base = StackMixin(BaseShadowComponent);

// Remove this if you don't have style
import styleDefault from './wmax-center.styles.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<slot class="js-container c-wmax-center"></slot>';

export default class WmaxCenter extends Base {
  // Style for this component
  // Remove this if you don't have style
  static get style() {
    return styleDefault.toString();
  }

  // Remove this if you don't have template
  template() {
    return tpl;
  }

  constructor() {
    super();
  }
}

customElements.define('bux2-wmax-center', WmaxCenter);
