import BaseShadowComponent from '../../../mixins/base/baseShadowComponent.mixin.js';
import TextSizeMixin from '../../../mixins/typography/textSize.mixin.js';
import BoldMixin from '../../../mixins/typography/bold.mixin.js';
import TextAlignmentMixin from '../../../mixins/typography/textAlignment.mixin.js';
import ColorThemeMixin from '../../../mixins/typography/color-theme.mixin';
import TagMixin from '../../../mixins/dom/tag.mixin.js';
import BackgroundMixin from '../../../mixins/styles/background.mixin.js';

const Base = TagMixin(
  ColorThemeMixin(
    TextSizeMixin(
      BoldMixin(TextAlignmentMixin(BackgroundMixin(BaseShadowComponent)))
    )
  )
);
import styleDefault from './amount.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = '<span class="js-container m-tag"><slot></slot></span>';

/**
 * Component to display amounts with currency
 *
 * @element bux2-amount
 *
 * @extends {BaseShadowComponent} base component to declare shadow dom
 * @extends {TextSizeMixin, BoldMixin, TextAlignmentMixin} use typography mixins
 * @extends {TagMixin} used to declare root element using any HTMLElement
 * @extends {BackgroundMixin} add background color capacity
 *
 * @property {Number} value
 * @attribute data-value
 *
 * @property {String} currency
 * @attribute data-currency
 *
 * @property {Boolean} round
 * @attribute round
 *
 * @property {Number} minFractionDigits
 * @attribute min-fraction-digits
 *
 * @property {Number} maxFractionDigits
 * @attribute max-fraction-digits
 */

export class Amount extends Base {
  static get properties() {
    return {
      value: {
        type: 'number'
      },
      currency: {
        type: 'string'
      },
      round: {
        type: 'boolean'
      },
      suffix: {
        type: 'string'
      },
      minFractionDigits: {
        type: 'number'
      },
      maxFractionDigits: {
        type: 'number'
      }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'value':
      case 'currency':
      case 'round':
      case 'suffix':
      case 'min-fraction-digits':
      case 'max-fraction-digits':
        let val = Number(this.value);

        if (!isNaN(val)) {
          let fractionDigitNumber;
          if (this.round) {
            fractionDigitNumber = 0;
          } else {
            fractionDigitNumber = 2;
          }
          this.textContent = `${val.toLocaleString('fr', {
            minimumFractionDigits:
              this.minFractionDigits !== null
                ? Number(this.minFractionDigits)
                : fractionDigitNumber,
            maximumFractionDigits:
              this.maxFractionDigits !== null
                ? Number(this.maxFractionDigits)
                : fractionDigitNumber,
            style: 'currency',
            currency: this.currency || 'EUR'
          })}`;
          if (!this.container) return;
          if (val < 0) {
            this.container.classList.add('c-amount--negative');
          } else {
            this.container.classList.remove('c-amount--negative');
          }

          if (this.suffix) {
            this.textContent = this.textContent + this.suffix;
          }
        }
        break;
      case 'background':
      case 'background-light':
        if (!this.container) return;
        if (this.background || this.backgroundLight) {
          this.container.classList.add(`c-amount--${name}`);
        } else {
          this.container.classList.remove(`c-amount--${name}`);
        }
        break;
    }
  }
}

customElements.define('bux2-amount', Amount);
