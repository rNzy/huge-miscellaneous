import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import BreakpointMixin from '../../../mixins/dom/breakpoint.mixin';

const Base = BreakpointMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-card js-container">
  <slot name="card-header"></slot>
  <slot name="card-body"></slot>
  <slot name="card-footer"></slot>
</section>
`;

export default class Card extends Base {
  constructor() {
    super();
  }

  template() {
    return tpl;
  }
}
