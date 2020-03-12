import BuxClass from '../../../../bux.class';
import './checkbox.styles.scss';

customElements.define(
  'bux-checkbox',

  class CheckBox extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    static get observedAttributes() {
      return [
        'data-name',
        'data-label',
        'data-sublabel',
        'checked',
        'self-padding'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      switch (name) {
        case 'data-name':
          this.name = newVal;
          if (!this.isInit) return;
          this.input.setAttribute('name', this.name);
          break;
        case 'data-label':
          this.label = newVal;
          if (!this.isInit) return;
          this.labelEl.innerHTML = newVal;
          break;
        case 'data-sublabel':
          this.sublabel = newVal;
          if (!this.isInit) return;
          this.sublabelEl.innerHTML = newVal;
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

    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      this.idPrefixe =
        'bux-checkbox-' + (Math.floor(Math.random() * 10000) + 2);

      this.label = this.getAttribute('data-label') || '';
      this.sublabel = this.getAttribute('data-sublabel') || '';
      this.name = this.getAttribute('data-name') || '';
      this.type = this.getAttribute('type') || 'default';
      this.selfPadding = this.getAttribute('self-padding') || '';

      this._checked =
        this.hasAttribute('checked') &&
        this.getAttribute('checked') !== 'false';

      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      this.input = tpl.content.querySelector('input');
      this.labelEl = tpl.content.querySelector('.c-checkbox__label-div');
      this.sublabelEl = tpl.content.querySelector('.c-checkbox__sublabel-div');

      // Add listener
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

      // Insert slot in previous selected element
      this.cont = tpl.content.querySelector('.c-checkbox__label-div');
      while (this.childNodes.length > 0) {
        this.cont.appendChild(this.childNodes[0]);
      }

      this.setCheck();
      //this.innerHTML = '';
      this.appendChild(tpl.content);
    }

    setCheck() {
      if (!this.input) return;
      this.input.checked = this._checked;
      this.dispatchEvent(new Event('change'));
    }

    isSelfPadding() {
      if (this.selfPadding) {
        let paddingClass = '';
        switch (this.selfPadding) {
          case 'sm':
            paddingClass = ' c-self-padding--sm';
            break;
          case 'md':
            paddingClass = ' c-self-padding--md';
            break;
        }
        return paddingClass;
      } else {
        return '';
      }
    }

    template() {
      if (this.type === 'cardstyle') {
        return `
        <input class="c-checkbox__input" id="${
          this.idPrefixe
        }" type="checkbox" ${this.name ? `name="${this.name}"` : ''}>
        <label class="c-checkbox__label c-checkbox__label--cardstyle" for="${
          this.idPrefixe
        }">
          <div class="c-checkbox__animated"></div>
          <div class="c-checkbox__content">
            <div class="c-checkbox__label-div">${this.label}</div>
            <div class="c-checkbox__sublabel-div">${this.sublabel}</div>
          </div>
        </label>
        `;
      }
      return `
        <input class="c-checkbox__input" id="${
          this.idPrefixe
        }" type="checkbox" ${this.name ? `name="${this.name}"` : ''}>
        <label class="c-checkbox__label${this.isSelfPadding()}" for="${
        this.idPrefixe
      }">
          <div class="c-checkbox__animated"></div>
          <div class="c-checkbox__label-div">${this.label}</div>
          <div class="c-checkbox__sublabel-div">${this.sublabel}</div>
        </label>
      `;
    }
  }
);
