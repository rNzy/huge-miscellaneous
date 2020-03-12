import BaseShadowComponent from '../../../../core/base/baseShadowComponent.mixin';

const tpl = document.createElement('template');
tpl.innerHTML = `<slot></slot>`;

let counter = 0;

export default class TabsBtnBase extends BaseShadowComponent {
  static get properties() {
    return {
      selected: { type: 'boolean' }
    };
  }

  constructor() {
    super();
  }

  template() {
    return tpl;
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.id) this.id = `ux-tabs-btn-${counter++}`;

    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', 'false');
    this.tabIndex = -1;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);

    if (name === 'selected') {
      if (this.selected) {
        this.setAttribute('aria-selected', 'true');
        this.setAttribute('tabindex', 0);
      } else {
        this.setAttribute('aria-selected', 'false');
        this.setAttribute('tabindex', -1);
      }
    }
  }
}
