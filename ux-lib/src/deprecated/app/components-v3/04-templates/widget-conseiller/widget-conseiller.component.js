import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

import styleDefault from './widget-conseiller.style.css';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-widget-conseiller">
  <div class="c-widget-conseiller__content">
    <slot name="widget-conseiller-user">
      <div class="placeholder"></div>
    </slot>
  </div>
  <div class="c-widget-conseiller__phone">
    <slot name="widget-conseiller-phone">
      <div class="placeholder"></div>
    </slot>
  </div>
  <div class="c-widget-conseiller__nav">
    <slot name="widget-conseiller-nav">
      <div class="placeholder"></div>
    </slot>
  </div>
</section>
`;

class WidgetConseiller extends Base {
  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}

window.customElements.define('bux2-widget-conseiller', WidgetConseiller);
