import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const tpl = document.createElement('template');
tpl.innerHTML = `<slot></slot>`;

/**
 * `TabsButtonBase` est un onglet du <ux-tabs>. <ux-tabs> devrait toujours avoir un `role=heading` dans le markup
 * pour que la sémantique reste utilisable même quand le javascript est désactivé.
 *
 * @prop {Boolean} selected - est il selectionné ?
 */
export default class TabsOnePanelButtonBase extends BaseShadowComponent {
  static get properties() {
    return {
      selected: { type: 'boolean' }
    };
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    this.setAttribute('role', 'tab');
    this.setAttribute('slot', 'tab');
    this.setSelected();
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
}
