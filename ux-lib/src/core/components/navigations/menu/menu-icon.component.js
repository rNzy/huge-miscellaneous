import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';

import styleDefault from './menu-icon.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `
<a class="c-menu-icon js-container" aria-label="" title="" href="">
<ux-svg></ux-svg>
</a>`;
/**
 *
 *
 * @export
 * @class MenuIconBase
 * @extends {BaseShadowComponent}
 *
 */
export default class MenuIconBase extends BaseShadowComponent {
  static get properties() {
    return {
      libLink: { type: 'string' },
      icon: { type: 'string' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.iconEl = this.$.querySelector('ux-svg');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'lib-link') {
      if (this.libLink) {
        this.container.setAttribute('href', this.libLink);
      }
    }
    if (name === 'icon') {
      if (this.icon) {
        this.iconEl.icon = this.icon;
      }
    }
  }
}
