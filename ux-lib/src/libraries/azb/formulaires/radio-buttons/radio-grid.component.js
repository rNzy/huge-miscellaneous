import GridBase from '../../../../core/components/structures/grid/grid.component';

import styleDefault from './radio-grid.style.css';

const Base = GridBase;

const tpl = document.createElement('template');
tpl.innerHTML = `
<div class="c-radio-grid">
  <div class="js-container c-grid"></div>
</div>`;

class RadioGrid extends Base {
  static get properties() {
    return {
      value: { type: 'string' },
      checked: { type: 'boolean' }
    };
  }

  static get style() {
    return styleDefault.toString();
  }

  template() {
    return tpl;
  }

  constructor() {
    super();
    this.radioBtn = this.$.querySelector('.c-radio-grid');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (super.attributeChangedCallback)
      super.attributeChangedCallback(name, oldValue, newValue);
    if (name === 'checked') {
      this.checked
        ? this.radioBtn.classList.add('c-radio-grid--checked')
        : this.radioBtn.classList.remove('c-radio-grid--checked');
    }
  }

  connectedCallback() {
    if (super.connectedCallback) super.connectedCallback();

    if (!this.hasAttribute('role')) this.setAttribute('role', 'radio');
    if (!this.hasAttribute('tabindex')) this.setAttribute('tabindex', -1);
  }
}

customElements.define('ux-radio-grid', RadioGrid);
