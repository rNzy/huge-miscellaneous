import BaseShadowComponent from '../../../base/baseShadowComponent.mixin.js';
import StackMixin from '../../../mixins/layout/stack.mixin';
import styleDefault from './flex.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="js-container c-flex">
                    <slot></slot>
                </div>`;

/**
 * Aligne ses éléments enfants en utilisant flexbox. Par défaut, les options flex utilisées sont row wrap flex-start et center.
 *
 * @element ux-flex
 *
 * @prop {Boolean} [column] - aligne les éléments enfants sur une colonne
 * @prop {Boolean} [nowrap] - empêche les éléments enfants de passer l'un en-dessous de l'autre
 * @prop {"end"|"center"|"space-evenly"|"space-around"|"space-between"} [justifyContent] - modifie l'alignement horizontal
 * @prop {"start"|"end"} [alignItems] - modifie l'alignement vertical
 *
 * @slot default
 *
 * @export
 * @class FlexBase
 * @extends {BaseShadowComponent, StackMixin}
 */
export default class FlexBase extends StackMixin(BaseShadowComponent) {
  static get properties() {
    return {
      column: {
        type: 'boolean'
      },
      nowrap: {
        type: 'boolean'
      },
      justifyContent: {
        type: 'string'
      },
      alignItems: {
        type: 'string'
      }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'column':
        this.setBooleanClass(this.column, 'c-flex--column', this.container);
        break;

      case 'nowrap':
        this.setBooleanClass(this.nowrap, 'c-flex--nowrap', this.container);
        break;

      case 'justify-content':
        this.setBooleanClass(
          this.justifyContent,
          `c-flex--justify-${this.justifyContent}`,
          this.container
        );
        break;

      case 'align-items':
        this.setBooleanClass(
          this.alignItems,
          `c-flex--align-${this.alignItems}`,
          this.container
        );
        break;
    }
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }
}
