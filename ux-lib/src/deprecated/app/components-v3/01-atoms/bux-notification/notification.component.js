import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin.js';

const Base = AriaHiddenStyleMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-notification js-container"></div>
<span class="a11y-hidden"></span>
`;

export default class Btn extends Base {
  static get properties() {
    return {
      value: {
        type: 'number'
      },
      a11yLabel: {
        type: 'string'
      }
    };
  }

  template() {
    return tpl;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;

    switch (name) {
      case 'value':
        this._setValue();
        break;
      case 'a11y-label':
        this._setA11yLabel();
        break;
    }
  }

  _setValue() {
    this.container.textContent = this.value;
  }

  _setA11yLabel() {
    if (this.a11yLabel) {
      this.$.querySelector('.a11y-hidden').innerHTML = this.a11yLabel;
    } else {
      this.$.querySelector('.a11y-hidden').innerHTML = '';
    }
  }
}
