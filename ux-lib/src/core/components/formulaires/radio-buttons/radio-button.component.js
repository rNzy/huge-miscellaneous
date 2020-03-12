import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = '<slot></slot>';

/**
 * Composant affichant un bouton radio.
 *
 * @element ux-radio-button
 *
 * @prop {String} value - "value" de l'élément html bouton radio
 * @prop {Boolean} checked - indique si le bouton radio est sélectionné
 *
 * @slot - default
 *
 * @export
 * @class RadioButtonBase
 * @extends {BaseShadowComponent}
 */
export default class RadioButtonBase extends Base {
  static get properties() {
    return {
      value: { type: 'string' },
      checked: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', -1);
  }
}
