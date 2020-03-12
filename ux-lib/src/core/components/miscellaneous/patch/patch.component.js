import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import StackMixin from '../../../mixins/layout/stack.mixin';
import ElementAlignmentMixin from '../../../mixins/layout/elementAlignment.mixin';

const Base = ElementAlignmentMixin(StackMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="c-patch js-container">
                  <div class="c-patch--top">
                    <slot name="top"></slot>
                  </div>
                  <div class="c-patch--bottom">
                    <slot name="bottom"></slot>
                  </div>
                </div>`;

/**
 * @export
 * @class PatchBase
 * @extends {Base}
 *
 * @prop {Boolean} shadow - Attribut permettant d'ajouter une ombre au patch
 * @prop {String} libBgColor - Attribut permettant de modifier la couleur de fond au patch
 */
export default class PatchBase extends Base {
  static get properties() {
    return {
      shadow: { type: 'boolean' },
      libBgColor: { type: 'string' }
    };
  }

  template() {
    return tpl;
  }

  constructor() {
    super();

    this._patch = this.$.querySelector('.c-patch');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    switch (name) {
      case 'shadow':
        this._shadow();
        break;
      case 'lib-bg-color':
        this._setBgColor();
        break;
    }
  }

  _setBgColor() {
    switch (this.libBgColor) {
      case 'primary':
      case 'secondary':
      case 'secondary-light':
      case 'tertiary':
        this._patch.classList.add(`c-patch--${this.libBgColor}`);
        break;
    }
  }

  _shadow() {
    this.shadow
      ? this._patch.classList.add('c-patch--shadow')
      : this._patch.classList.remove('c-patch--shadow');
  }
}
