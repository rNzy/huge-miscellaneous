import InputNumber from './input-number.component.js';

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-input-wrap">
  <input class="c-input c-input-amount js-delegate-focus"><ux-text aria-hidden="true" lib-size="sm">€</ux-text>
</div>
<div style="display:none;" class="a11y-desc a11y-hidden"></div>
<slot class="c-input-error" style="display:none;" name="error"></slot>
`;

/**
 * Composant, dérivé de l'ux-input-number, affichant un champ montant, positif ou négatif, avec sa devise.
 *
 * @element ux-input-amount
 *
 * @prop {String} [currency=euro] - la devise
 *
 * @slot error
 *
 * @export
 * @class InputAmount
 * @extends {InputNumber}
 */
export default class InputAmount extends InputNumber {
  static get properties() {
    return {
      currency: {
        type: 'string',
        defaultValue: 'euro'
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'currency') {
      const currencyEl = this.$.querySelector('ux-text');
      switch (this.currency) {
        case 'euro':
          currencyEl.innerText = '€';
          break;
        case 'usd':
          currencyEl.innerText = '$';
          break;
        default:
          currencyEl.innerText = this.currency;
          break;
      }
    }
  }

  template() {
    return tpl;
  }
}
