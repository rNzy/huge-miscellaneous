import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';

import styleDefault from './account.default.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<section class="js-container c-widget-account">
  <div class="c-widget-account__top">
    <div class="c-widget-account__amount">
      <slot name="widget-amount">
        <div class="placeholder"></div>
      </slot>
      <svg class="c-widget-account__arrow" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.419 49L9.5 42.1l17.16-17L9.5 7.8 16.419.944 40.5 24.808 16.419 48.944z"/>
      </svg>
    </div>
    <div class="c-widget-account__delayed-op">
      <slot name="widget-delayed-operations">
        <div class="placeholder"></div>
      </slot>
    </div>
  </div>
</section>
`;

const tplAccountNav = document.createElement('template');
tplAccountNav.innerHTML = `
<div class="c-widget-account__nav">
  <slot name="widget-nav">
    <div class="placeholder"></div>
  </slot>
</div>
`;

class WidgetAccount extends BaseShadowComponent {
  static get properties() {
    return {
      link: {
        type: 'boolean'
      },
      libLink: {
        type: 'boolean'
      },
      shortcuts: {
        type: 'string'
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

    switch (name) {
      case 'link':
        this._setLink();
        break;
      case 'lib-link':
        this._setLibLink();
        break;
      case 'shortcuts':
        this._setShortcuts();
        break;
    }
  }

  _setLink() {
    if (!this.container) return;
    if (this.link) {
      this.container.classList.add('c-widget-account--link');
    } else {
      this.container.classList.remove('c-widget-account--link');
    }
  }

  _setLibLink() {
    if (this.libLink) {
      this.container.classList.add('c-widget-account--link');
    } else {
      this.container.classList.remove('c-widget-account--link');
    }
  }

  _setShortcuts() {
    const accountNav = this.$.querySelector('.c-widget-account__nav');
    if (!accountNav) {
      this.container.appendChild(tplAccountNav.content.cloneNode(true));
    } else {
      return;
    }
  }
}

window.customElements.define('bux2-widget-account', WidgetAccount);
