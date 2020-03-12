import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';
import styleDefault from './menu-item.style.css';

const tpl = document.createElement('template');
tpl.innerHTML = `<div class="js-container c-menu-item"><slot></slot></div>`;

/**
 *
 *
 * @export
 * @class MenuItemBase
 * @extends {BaseShadowComponent}
 *
 * @prop {Boolean} active - est il actif ?
 * @prop {String} icon - nom de l'icone a affiche à gauche
 *
 * @slot - le nom a aficher pour le menu
 */
export default class MenuItemBase extends BaseShadowComponent {
  static get properties() {
    return {
      active: { type: 'boolean' },
      icon: { type: 'string' },
      submenu: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  static get style() {
    return styleDefault.toString();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'icon') {
      this.setIcon();
    }
  }

  setIcon() {
    if (this.icon) {
      if (this.iconEl) {
        this.iconEl.icon = this.icon;
      } else {
        this.iconEl = document.createElement('ux-svg');
        this.iconEl.setAttribute('icon', this.icon);
        this.iconEl.setAttribute('aria-hidden', 'true');
        this.iconEl.setAttribute('lib-size', this.iconSize);
        this.iconEl.classList.add('c-menu-item__icon');
        //this.insertBefore(this.iconEl, this.firstChild);
        this.container.insertBefore(this.iconEl, this.container.firstChild);
      }
    } else {
      this.iconEl.remove();
    }
  }

  //@todo remove all function after this
  toogleActive() {
    this.active = !this.active;
  }

  constructor() {
    super();
    this.iconEl = null;
    this.iconSize = 'md';
    this.toogleActive = this.toogleActive.bind(this);
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();
    this.addEventListener('click', this.toogleActive);
  }
}
