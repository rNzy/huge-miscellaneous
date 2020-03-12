import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './steps.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-steps js-container">
    <div class="c-steps__wrapper">
      <slot name="steps"></slot>
    </div>
    <div class="c-steps__progress js-progress-wrapper" aria-hidden="true">
      <slot name="progress"></slot>
    </div>
</section>
`;

/**
 * @element bux2-steps
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @slot default/unnamed slot
 *
 */

export class Steps extends Base {
  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.progressBarWrapper = this.$.querySelector('.js-progress-wrapper');
    this._setProgressBar = this._setProgressBar.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    setTimeout(this._setProgressBar, 150);
    window.addEventListener('resize', this._setProgressBar);
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this._setProgressBar);
  }

  template() {
    return tpl;
  }

  _setProgressBar() {
    const items = this.querySelectorAll('bux2-step-item');
    const firstItem = items[0].getBoundingClientRect();
    const lasttItem = items[items.length - 1].getBoundingClientRect();
    const ProgressWidth = lasttItem.x - firstItem.x;

    this.progressBarWrapper.style.width = `${ProgressWidth}px`;
  }
}

window.customElements.define('bux2-steps', Steps);
