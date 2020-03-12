import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import StackMixin from '../../../../core/mixins/layout/stack.mixin';
import FocusableMixin from '../../../../core/mixins/styles/focusable.mixin';

const Base = FocusableMixin(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="js-container c-container"><slot></slot></div>`;
/**
 * Permet de créer un conteneur et de lui appliquer différents styles.
 *
 * @element ux-container
 *
 * @prop {"base"|"space-around"} [type] - modifie le layout du container
 * @prop {"left"|"right"} [margin] - ajoute un espace externe à gauche ou à droite du container
 * @prop {"xs"|"sm"|"md"|"lg"|"xl"|"xxl"} [padding] - ajoute un espace interne sur tous les côtés du container
 * @prop {Boolean} [nopadding] - retire le padding de base du container
 * @prop {Boolean} [shadow] - ajoute une ombre au container
 *
 * @slot - default
 *
 * @export
 * @class ContainerBase
 * @extends {BaseShadowComponent, StackMixin, FocusableMixin}
 */
export default class ContainerBase extends Base {
  static get properties() {
    return {
      type: { type: 'string' },
      margin: { type: 'string' },
      nopadding: { type: 'boolean' },
      shadow: { type: 'boolean' },
      padding: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    switch (name) {
      case 'type':
        this._setType();
        break;
      case 'margin':
        this._setMargin();
        break;
      case 'nopadding':
        this.nopadding
          ? this.container.classList.add('c-container--nopadding')
          : this.container.classList.remove('c-container--nopadding');
        break;
      case 'shadow':
        this.shadow
          ? this.container.classList.add('c-container--shadow')
          : this.container.classList.remove('c-container--shadow');
        break;
      case 'padding':
        //  Remove old class
        this.container.className = this.container.className.replace(
          /c-container-padding--\w*/g,
          ''
        );
        if (this.padding)
          this.container.classList.add(`c-container-padding--${this.padding}`);
        break;
    }
  }

  _setType() {
    switch (this.type) {
      case 'base':
      case 'space-around':
        this.container.classList.add(`c-container--${this.type}`);
        break;
    }
  }

  _setMargin() {
    switch (this.margin) {
      case 'right':
      case 'left':
        this.container.classList.add(`c-container--margin-${this.margin}`);
        break;
    }
  }
}
