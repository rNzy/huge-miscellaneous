import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';

const Base = StackMixin(BaseShadowComponent);

const tpl = document.createElement('template');
tpl.innerHTML = `<form class="js-container" role="form"><slot></slot></form>`;

/**
 * Crée une balise form.
 *
 * @element ux-form
 *
 * @prop {boolean} [autocompleteOff] - (deprecated) Empêche le navigateur de remplir automatiquement les champs du formulaire
 * @prop {boolean} [novalidate] - (deprecated) Empêche le comportement naturel de validation lorsqu'on clique sur l'input type=submit
 *
 * @slot default
 *
 * @export
 * @class FormBase
 * @extends {BaseShadowComponent, StackMixin}
 *
 * NB : à cause du shadowDOM les propriétés autocompleteoff et novalidate ne fonctionnent pas.
 * Il faut ajouter sur l'ux-input même autocomplete="off" et pour le novalidate soit ne pas le mettre en requis soit pas de solution
 */
export default class FormBase extends Base {
  static get properties() {
    return {
      autocompleteOff: { type: 'boolean' },
      novalidate: { type: 'boolean' }
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
      case 'autocomplete-off':
        this._setAutocompleteOff();
        break;
      case 'novalidate':
        this.novalidate
          ? this.container.setAttribute('novalidate', '')
          : this.container.removeAttribute('novalidate');
        break;
    }
  }

  _setAutocompleteOff() {
    if (this.hasAttribute('autocomplete-off'))
      this.container.setAttribute('autocomplete', 'off');
    else this.container.removeAttribute('autocomplete');
  }
}
