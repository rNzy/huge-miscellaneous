import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import TextSizeMixin from '../../../mixins/typography/textSize.mixin';
import BoldMixin from '../../../mixins/typography/bold.mixin.js';
import TextAlignmentMixin from '../../../mixins/typography/textAlignment.mixin.js';
import ColorThemeMixin from '../../../mixins/typography/color-theme.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin.js';

const Base = AriaHiddenStyleMixin(
  ColorThemeMixin(
    TextSizeMixin(BoldMixin(TextAlignmentMixin(BaseShadowComponent)))
  )
);

const tpl = document.createElement('template');
tpl.innerHTML =
  '<span aria-hidden="true" class="js-container c-amount"><slot></slot></span><span class="c-amount--a11y a11y-hidden"></span>';
/**
 * Composant permettant d'afficher des montants, positifs ou négatifs, avec leur devise.
 *
 * @element ux-amount
 *
 * @prop {Number} value - le montant à afficher
 * @prop {String} [currency=EUR] - la devise
 * @prop {Boolean} round - montant arrondi
 * @prop {String} suffix - ajoute un suffixe après le montant et la devise
 *
 * @export
 * @class AmountBase
 * @extends {BaseShadowComponent, TextAlignmentMixin, BoldMixin, TextSizeMixin, ColorThemeMixin, AriaHiddenStyleMixin}
 */
export default class AmountBase extends Base {
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
      }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._a11yAmount = this.$.querySelector('.c-amount--a11y');
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
        let val = Number(this.value);
        if (!isNaN(val)) {
          let fractionDigitNumber;
          if (this.round) {
            fractionDigitNumber = 0;
          } else {
            fractionDigitNumber = 2;
          }
          const options = {
            minimumFractionDigits: fractionDigitNumber,
            maximumFractionDigits: fractionDigitNumber,
            style: 'currency',
            currency: this.currency || 'EUR'
          };
          this.textContent = `${val.toLocaleString('fr', options)}`;
          // delete spaces to enhance vocalization
          let trimmedValue = this.textContent.replace(/\s/g, '');

          // replace the comma with the currency character for a better vocalization of decimal numbers
          if (trimmedValue.includes(',')) {
            trimmedValue = trimmedValue.replace(
              ',',
              trimmedValue.charAt(trimmedValue.length - 1)
            );
            trimmedValue = trimmedValue.substring(0, trimmedValue.length - 1);
          }

          // add the right sign if the value is negative
          if (trimmedValue.startsWith('-')) {
            trimmedValue = trimmedValue.replace('-', '−');
          }

          // inject to a11y span
          this._a11yAmount.innerHTML = trimmedValue;

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
    }
  }
}
