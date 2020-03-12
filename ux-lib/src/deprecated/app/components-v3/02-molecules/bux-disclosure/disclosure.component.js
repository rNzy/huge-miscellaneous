import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import AriaExpandedMixin from '../../../mixins/aria/expanded.mixin.js';
const Base = AriaExpandedMixin(BaseShadowComponent);

import styleDefault from './disclosure.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-disclosure js-container">
  <button class="c-disclosure__button js-button"
          aria-expanded="false"
          aria-controls="show-content">
  </button>
  <div class="c-disclosure__icon-right"><slot name="icon-right"></slot></div>
  <div id="show-content" class="c-disclosure__content js-content">
    <slot name="content"></slot>
  </div>
</section>
`;

/**
 * @element bux2-disclosure
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @attr {Boolean} expanded
 * @attr {String} label - to define the label that is displayed when not expanded
 * @attr {String} labelExpanded - to define the label that is displayed when expanded
 *
 * @slot default/unnamed slot
 *
 */

export class Disclosure extends Base {
  static get properties() {
    return {
      label: {
        type: 'string'
      },
      labelExpanded: {
        type: 'string'
      },
      center: {
        type: 'boolean'
      }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'label':
        this.button.innerHTML = `${this.label}<bux2-svg icon="arrow-down" size="xs" class="c-disclosure__svg"></bux2-svg>`;
        break;
      case 'expanded':
        if (this.expanded) {
          this.button.classList.add('c-disclosure__button--expanded');
          this.button.innerHTML = `${
            this.labelExpanded ? this.labelExpanded : this.label
            }<bux2-svg icon="arrow-down" size="xs" rotate="180" class="c-disclosure__svg"></bux2-svg>`;
        } else {
          this.button.classList.remove('c-disclosure__button--expanded');
          this.button.innerHTML = `${this.label}<bux2-svg icon="arrow-down" size="xs" class="c-disclosure__svg"></bux2-svg>`;
        }
        break;
      case 'center':
        this.button.classList.add('c-disclosure__button--center');
        break;
    }
  }
}

window.customElements.define('bux2-disclosure', Disclosure);
