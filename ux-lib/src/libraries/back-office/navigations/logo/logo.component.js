import LogoBase from '../../../../core/components/navigations/logo/logo.component';

import styleDefault from './logo.style.css';

/**
 *
 *
 * @export
 * @class Logo
 * @extends {LogoBase}
 *
 * @prop {Boolean} center - centrer le logo
 */
export default class Logo extends LogoBase {
  static get properties() {
    return {
      center: {
        type: 'boolean'
      }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'center')
      this.setBooleanClass(this.center, 'c-logo-center-center', this);
  }
}

customElements.define('ux-logo', Logo);
