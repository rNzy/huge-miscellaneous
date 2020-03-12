import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';

const Base = BaseShadowComponent;

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-input-item js-container"><slot></slot></div>';

/**
 * Composant permettant de grouper un ux-label et un ux-input.
 *
 * @element ux-input-item
 *
 * @prop {Boolean} [inline] - met sur une même ligne le label et l'input
 *
 * @slot default
 *
 * @export
 * @class InputItem
 * @extends {BaseShadowComponent}
 */
export default class InputItem extends Base {
  template() {
    return tpl;
  }

  static get properties() {
    return {
      inline: { type: 'boolean' }
    };
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (!this.container) return;
    if (name === 'inline') {
      this.setBooleanClass(this.inline, 'c-input-item--inline');
    }
  }
}
