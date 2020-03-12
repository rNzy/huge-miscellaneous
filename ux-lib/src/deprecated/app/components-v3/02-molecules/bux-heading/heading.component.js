import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './heading.style.css';

/**
 * Component to display any type of text
 *
 * @element bux2-heading
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 */
export class Heading extends Base {
  static get properties() {
    return {
      level: {
        type: 'number'
      },
      borderColored: {
        type: 'boolean'
      },
      styleLevel: {
        type: 'number'
      }
    };
  }
  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.container = this.$.querySelector('.js-container');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    switch (name) {
      case 'border-colored':
        if (this.hasAttribute('border-colored')) {
          this.container.classList.add('c-heading--border-colored');
        } else {
          this.container.classList.remove('c-heading--border-colored');
        }
        break;
    }
  }

  template() {
    const level = this.level || '2';
    const styleLevel = this.styleLevel || this.level;
    const tpl = document.createElement('template');
    tpl.innerHTML = `
    <h${level} class="js-container c-heading c-heading-${styleLevel}">
      <span class="c-heading-s1">
        <slot name="left"></slot>
        <slot></slot>
      </span>
      <span><slot name="right"></slot></span>
    </h${level}>`;
    return tpl;
  }
}

window.customElements.define('bux2-heading', Heading);
