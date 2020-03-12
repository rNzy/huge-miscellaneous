import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

export default class RadioButton extends Base {
  static get properties() {
    return {
      value: { type: 'string' },
      checked: { type: 'boolean' }
    };
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', -1);
  }
}
