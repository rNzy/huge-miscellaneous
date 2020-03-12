import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import HiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';

import styleDefault from './virtualis.style.css';

import card from './card.jpg';
import mastercard from './mastercard.png';

import ocraext from './ocraext.woff';
import ocraext2 from './ocraext.woff2';

const tpl = document.createElement('template');
tpl.innerHTML = `
  <div class="c-virtualis-name"></div>
  <div class="c-virtualis-user"></div>
  <div class="c-virtualis-card"></div>

  <div class="c-virtualis-wrap">
    <div>
      <span>Montant</span>
      <ux-amount class="c-virtualis-amount"></ux-amount>
    </div>
    <div>
      <span aria-hidden="true">Validité</span>
      <span class="a11y-hidden">Validité de la carte virtuelle : </span>
      <ux-date class="c-virtualis-validity"></ux-date>
    </div>
    <div>
      <span aria-hidden="true">Cryptogramme</span>
      <span class="c-virtualis-crypto"></span>
    </div>
  </div>
  <ux-img aria-hidden="true" class="c-virtualis-brand" src="${mastercard}"></ux-img>
  <ux-img aria-hidden="true" class="c-virtualis-img" src="${card}"></ux-img>
`;

/**
 * @export
 * @class PatchBase
 * @extends {Base}
 *
 * @prop {String} name - nom
 * @prop {String} user - nom de l'utilisateur
 * @prop {String} card - numero
 * @prop {String} amount - montant
 * @prop {String} validity - date de péremption
 * @prop {String} crypto - cvs
 */
export default class VirtualisBase extends HiddenStyleMixin(
  BaseShadowComponent
) {
  static get properties() {
    return {
      name: { type: 'string' },
      user: { type: 'string' },
      card: { type: 'string' },
      amount: { type: 'number' },
      validity: { type: 'string' },
      crypto: { type: 'number' }
    };
  }

  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    // ajout de la font
    const link = document.createElement('style');
    link.innerHTML = `@font-face {
      font-family: 'ocraext';
      font-style: normal;
      font-weight: 400;
      src: local('ocraext'), url('${this.uxLibUrl}/${ocraext2}') format('woff2'),
      url('${this.uxLibUrl}/${ocraext}') format('woff');
    }`;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'name':
        if (this.name) {
          this.$.querySelector(`.c-virtualis-name`).innerHTML =
            '<span class="a11y-hidden">Type de carte virtuelle : </span>' +
            this.name;
        } else {
          this.$.querySelector(`.c-virtualis-name`).innerHTML = '';
        }
        break;
      case 'user':
        if (this.user) {
          this.$.querySelector(`.c-virtualis-user`).innerHTML =
            '<span class="a11y-hidden">Titulaire de la carte virtuelle : </span>' +
            this.user;
        } else {
          this.$.querySelector(`.c-virtualis-user`).innerHTML = '';
        }
        break;
      case 'validity':
        if (this.validity) {
          this.$.querySelector(`.c-virtualis-validity`).formatIn = 'mm/yy';
          this.$.querySelector(`.c-virtualis-validity`).value = this.validity;
        }
        break;
      case 'crypto':
        if (this.crypto) {
          this.$.querySelector(`.c-virtualis-crypto`).innerHTML =
            '<span class="a11y-hidden">Cryptogramme de la carte virtuelle : </span>' +
            this.crypto;
        }
        break;
      case 'amount':
        if (this.amount)
          this.$.querySelector(`.c-virtualis-amount`).value = this.amount;
        break;
      case 'card':
        const newValueFix = this.card
          .replace(/\s/g, '') // suprimme tout les espaces
          .replace(/(.{4})/g, '$1 ') // met un espace tout les 4 caractères
          .trim() // supprime les espaces
          .substring(0, 19); // supprime les caractères de fin en trop

        // met les bons espaces
        this.$.querySelector(`.c-virtualis-${name}`).innerHTML =
          '<span class="a11y-hidden">Numéro de la carte virtuelle : </span>' +
          newValueFix;
        break;
    }
  }
}
