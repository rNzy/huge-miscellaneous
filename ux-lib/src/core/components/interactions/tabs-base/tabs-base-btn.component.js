import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const tpl = document.createElement('template');
tpl.innerHTML = `<slot></slot>`;

let counter = 0;

/**
 * Composant intégré à ux-tabs permettant de gérer les boutons d'onglets.
 *
 * @element ux-tabs-button
 *
 * @prop {Boolean} selected - indique si le bouton est sélectionné
 *
 * @slot default
 *
 * @export
 * @class TabsBtnBase
 * @extends {BaseShadowComponent}
 */
export default class TabsBtnBase extends BaseShadowComponent {
  static get properties() {
    return {
      selected: { type: 'boolean' }
    };
  }

  constructor() {
    super();
    this.click = this.click.bind(this);
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.id) this.id = `ux-tabs-btn-${counter++}`;

    this.addEventListener('click', this.click);
    this.setAttribute('role', 'tab');
    this.setSelected();
  }

  disconnectedCallback() {
    if (super.disconnectedCallback) super.disconnectedCallback();
    this.removeEventListener('click', this.click);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'selected') {
      this.setSelected();
    }
  }

  setSelected() {
    this.setBooleanAttr(this.selected, 'aria-selected', this, true);
    this.selected ? (this.tabIndex = 0) : (this.tabIndex = -1);
  }

  click() {
    // On envoi un event
    this.dispatchEvent(
      new CustomEvent('uxTabBtnClick', {
        detail: {
          tab: this
        },
        bubbles: true
      })
    );
  }
}
