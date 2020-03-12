import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

import styleDefault from './widget-card.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-widget-card">
  <div class="c-widget-card__content">
    <slot name="widget-card-content">
      <div class="placeholder"></div>
    </slot>
  </div>
  <div class="c-widget-card__ops">
    <slot name="widget-card-ops">
      <div class="placeholder"></div>
    </slot>
  </div>
  <div class="c-widget-card__nav">
    <slot name="widget-card-nav">
      <div class="placeholder"></div>
    </slot>
  </div>
</section>
`;

class WidgetCard extends BaseShadowComponent {
  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }
}

window.customElements.define('bux2-widget-card', WidgetCard);
