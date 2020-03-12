import MenuItemBase from './menu-item.component';
import AriaExpandedMixin from '../../../mixins/aria/expanded.mixin';
import BtnNoStyleMixin from '../../../mixins/styles/btnNoStyle.mixin';

import styleDefault from './menu-item-dropdown.style.css';

const Base = BtnNoStyleMixin(AriaExpandedMixin(MenuItemBase));

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-menu-item-dropdown js-container">
  <button class="c-menu-item-dropdown__trigger js-trigger m-btn-no-style">
    <slot class="c-menu-item-dropdown__header-slot" name="menu-header"></slot>
    <ux-svg icon="arrow-down" lib-size="md" class="c-menu-item-dropdown__icon" aria-hidden="true"></ux-svg>
  </button>
  <div class="c-menu-item-dropdown__content js-content" aria-hidden="true">
    <slot></slot>
  </div>
</div>
`;

// Compte le nombre d'instances de `<ux-menu-item>`. On utilise le nombre pour créer des IDs uniques.
let uxMenuItemCounter = 0;

/**
 *
 *
 * @export
 * @class MenuItemDropDownBase
 * @extends {Base}
 *
 * @slot menu-header - le nom a aficher pour le menu dropdown
 * @slot - contenu du dropdown
 */
export default class MenuItemDropDownBase extends Base {
  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  constructor() {
    super();
    this.iconDropEl = this.$.querySelector('.c-menu-item-dropdown__icon');
  }

  setIcon() {
    if (this.icon) {
      if (this.iconEl) {
        this.iconEl.icon = this.icon;
      } else {
        this.iconEl = document.createElement('ux-svg');
        this.iconEl.setAttribute('icon', this.icon);
        this.iconEl.setAttribute('aria-hidden', 'true');
        this.iconEl.setAttribute('lib-size', 'md');
        this.iconEl.classList.add('c-menu-item-dropdown-icon');

        const btn = this.$.querySelector('.c-menu-item-dropdown__trigger');
        btn.insertBefore(this.iconEl, btn.firstChild);
      }
    } else {
      this.iconEl.remove();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'expanded') {
      if (this.iconDropEl) {
        this.expanded
          ? this.iconDropEl.classList.add('c-menu-item-dropdown__icon--rotate')
          : this.iconDropEl.classList.remove(
              'c-menu-item-dropdown__icon--rotate'
            );
      }
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    const INSTANCE_ID = uxMenuItemCounter++;
    this.trigger.setAttribute('aria-controls', `ID-ACC-ITEM-${INSTANCE_ID}`);
    this.content.id = `ID-ACC-ITEM-${INSTANCE_ID}`;
  }
}
