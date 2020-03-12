import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

let DualPanelCounter = 0;

const styleDefault = require('./dualpanel.styles.default.css');

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-dualpanel">
  <div class="c-dualpanel__item"><slot name="panel01"></slot></div>
  <div class="c-dualpanel__item"><slot name="panel02"></slot></div>
</div>
`;

export default class DualPanel extends BaseShadowComponent {
  constructor() {
    super();
    this.count = DualPanelCounter++;
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    this.querySelector('[slot="panel02"]').id = 'c-dualpanel__item-B' + this.count;
  }
}

window.customElements.define('bux2-dualpanel', DualPanel);
