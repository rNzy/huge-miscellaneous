import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import AriaExpandedMixin from '../../../mixins/aria/expanded.mixin.js';
const Base = AriaExpandedMixin(BaseShadowComponent);

import styleDefault from './accordion-item.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="c-accordion-item js-container">
  <button class="c-accordion-item__button js-button"
          aria-expanded="false">
        <slot name="header">Afficher le détail</slot>
        <slot name="extra"></slot>
        <svg class="c-accordion-item__icon" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 50 50" version="1"><path d="M16 49l-6-7 17-17L10 8l6-7 25 24-25 24z"/></svg>
  </button>
  <div role="region" class="c-accordion-item__content js-content">
    <slot name="content"></slot>
  </div>
</section>
`;

/**
 * @element bux2-accordion-item
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 * @property {Boolean} expanded
 * @property {String} label - to define the label that is displayed initially
 *
 * @slot default/unnamed slot
 *
 */

export class AccordionItem extends Base {
  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'expanded') {
      if (this.expanded)
        this.button.classList.add('c-accordion-item__button--expanded');
      else this.button.classList.remove('c-accordion-item__button--expanded');
    }
  }
}

window.customElements.define('bux2-accordion-item', AccordionItem);
