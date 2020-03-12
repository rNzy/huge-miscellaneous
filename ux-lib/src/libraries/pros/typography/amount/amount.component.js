import AmountBase from '../../../../core/components/typography/amount/amount.component';
import BackgroundMixin from '../../../../core/mixins/styles/background.mixin.js';
import styleDefault from './amount.style.css';

const Base = BackgroundMixin(AmountBase);

class Amount extends Base {
  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'background-base':
      case 'background-light':
        if (!this.container) return;
        if (this.backgroundBase || this.backgroundLight) {
          this.container.classList.add(`c-amount--${name}`);
        } else {
          this.container.classList.remove(`c-amount--${name}`);
        }
        break;
    }
  }
}

customElements.define('ux-amount', Amount);
