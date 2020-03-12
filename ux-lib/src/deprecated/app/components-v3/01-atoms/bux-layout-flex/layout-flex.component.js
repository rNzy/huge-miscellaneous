import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

const Base = BaseShadowComponent;

import styleDefault from './layout-flex.style.css';

/**
 * Component to display any element in a flexbox parent
 *
 * @element bux2-layout-flex
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 *
 */

export class layoutFlex extends Base {
  static get properties() {
    return {
      column: {
        type: 'boolean'
      }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.container = this.$.querySelector('.c-flex');
    this.container
      ? this.container.setAttribute('role', 'list')
      : this.setAttribute('role', 'list');
    Array.from(this.children).forEach(item => {
      item.setAttribute('role', 'listitem');
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'column':
        this.setBooleanClass(this.column, 'c-flex--column');
        break;
    }
  }

  template() {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
    <div class="c-flex">
      <slot></slot>
    </div>
    `;
    return tpl;
  }
}

window.customElements.define('bux2-layout-flex', layoutFlex);
