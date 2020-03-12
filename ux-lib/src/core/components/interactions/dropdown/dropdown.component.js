import BaseShadowComponent from '../../../base/baseShadowComponent.mixin';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin';
import AriaHiddenStyleMixin from '../../../mixins/aria/hidden-style.mixin';

import style from './dropdown.style.css';

const Base = AriaHiddenStyleMixin(BtnNoStyleMixin(BaseShadowComponent));

const tpl = document.createElement('template');
tpl.innerHTML = `
  <span class="c-dropdown js-container">
    <button class="c-dropdown-trigger m-btn-no-style">
      <slot></slot>
      <span class="a11y-hidden">Cliquer ici pour ouvrir le menu</span>
    </button>
    <slot name="content"></slot>
  </span>`;

/**
 *
 *
 * @export
 * @class DropDownBase
 * @extends {Base}
 *
 * @prop {Boolean} [open=false] - est il ouvert ?
 * @prop {String} targetId - l'id de l'élément cible
 * @slot - L'élément sur lequel il faut cliquer pour afficher le dropdown
 * @slot content - le contenu a afficher dans le dropdown
 *
 */
export default class DropDownBase extends Base {
  static get properties() {
    return {
      open: { type: 'boolean', defaultValue: false },
      targetId: { type: 'string' }
    };
  }

  static get style() {
    return style.toString();
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.$.querySelector('.c-dropdown-trigger').addEventListener(
      'click',
      () => {
        this.open = !this.open;
      }
    );
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;

    if (name === 'open') {
      const content = this.$.querySelector('slot[name="content"]');
      if (this.open) {
        content.setAttribute('open', 'true');
        content.setAttribute('aria-hidden', 'false');
        content.tabIndex = 0;
        content.focus();
      } else {
        content.setAttribute('open', 'false');
        content.setAttribute('aria-hidden', 'true');
        content.tabIndex = '';
      }
    }
  }
}
