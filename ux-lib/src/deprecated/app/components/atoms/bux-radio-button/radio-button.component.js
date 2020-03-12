import BuxClass from '../../../../bux.class';
import './radio-button.styles.scss';

customElements.define(
  'bux-radio-button',

  class RadioButton extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
      this.idPrefixe = 'bux-radio-' + (Math.floor(Math.random() * 10000) + 2);
    }

    static get observedAttributes() {
      return ['data-name', 'checked', 'data-value'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      if (!this.isInit) return;
      switch (name) {
        case 'data-name':
          this.name = newVal;
          this.input.setAttribute('name', this.name);
          break;
        case 'data-value':
          this.value = newVal;
          this.input.setAttribute('value', this.value);
          break;
        case 'checked':
          this._checked =
            this.hasAttribute('checked') &&
            this.getAttribute('checked') !== 'false';
          if (!this.isInit || this.fromInput) return;
          this.setCheck();
          break;
      }
    }

    set checked(value) {
      const isChecked = Boolean(value);
      if (isChecked) this.setAttribute('checked', '');
      else this.removeAttribute('checked');
    }

    get checked() {
      return this._checked;
    }

    setCheck() {
      if (!this.input) return;
      this.input.checked = this._checked;
      //this.dispatchEvent(new Event('change'));
    }

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      this.label = this.getAttribute('data-label') || '';
      this.name = this.getAttribute('data-name') || '';
      this.value = this.getAttribute('data-value') || '';

      this._checked =
        this.hasAttribute('checked') &&
        this.getAttribute('checked') !== 'false';

      const tpl = document.createElement('template');
      tpl.innerHTML = `
          <input class="c-radio__input" id="${this.idPrefixe}" type="radio" ${
        this.name ? `name="${this.name}"` : ''
      }
      ${this.value ? `value="${this.value}"` : ''}
      >
          <label class="c-radio__label" for="${this.idPrefixe}">${
        this.label
      }</label>
        `;

      this.input = tpl.content.querySelector('input');

      this.input.addEventListener('change', e => {
        // fromInput is need to avoid infinite loop
        this.fromInput = true;
        if (e.target.checked) {
          this.setAttribute('checked', 'true');
        } else {
          this.removeAttribute('checked');
        }
        this.fromInput = false;
      });

      this.setCheck();

      this.appendChild(tpl.content);
    }
  }
);
