import BuxClass from '../../../../bux.class';

import './select.styles.scss';

customElements.define(
  'bux-select',
  class Select extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'layout',
        'data-value',
        'state',
        'data-label',
        'data-label-right',
        'required',
        'data-select-width',
        'data-error-msg',
        'nomargin'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      if (name !== 'data-value') {
        this[camelName] = newVal;
      }

      if (!this.isInit) return;

      switch (camelName) {
        case 'state':
        case 'layout':
        case 'nomargin':
          this.setClass();
          break;
        case 'value':
          this._value = newVal;
          this.selectEl.value = newVal;
          break;
        case 'required':
        case 'label':
        case 'labelRight':
          this.setLabelAndAccess();
          break;
        case 'selectWidth':
          this.setWidth();
          break;
        case 'errorMsg':
          this.errorSpan.innerHTML = this.errorMsg;
          this.displayError();
          break;
      }
    }

    set value(value) {
      this.setAttribute('data-value', value);
    }

    get value() {
      return this._value;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;

      this.idPrefixe = 'bux-select-' + (Math.floor(Math.random() * 10000) + 2);

      this._value = this.getAttribute('data-value');
      this.state = this.getAttribute('state') || 'empty';
      this.label = this.getAttribute('data-label') || null;
      this.labelRight = this.getAttribute('data-label-right') || null;
      this.selectWidth = this.getAttribute('data-select-width') || null;
      this.errorMsg = this.getAttribute('data-error-msg') || null;

      this.nomargin =
        this.hasAttribute('nomargin') &&
        this.getAttribute('nomargin') !== 'false';

      // Init attribut
      this.required =
        this.hasAttribute('required') &&
        this.getAttribute('required') !== 'false';

      this.stepIn =
        this.hasAttribute('a11y-step-in') &&
        this.getAttribute('a11y-step-in') !== 'false';

      this.stepOut =
        this.hasAttribute('a11y-step-out') &&
        this.getAttribute('a11y-step-out') !== 'false';

      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Select Elemt
      this.wrap = tpl.content.querySelector('.bux-select-wrap');
      this.labelEl = tpl.content.querySelector('.bux-select-label');
      this.labelRightEl = tpl.content.querySelector('.bux-select-label-right');

      this.errorDiv = tpl.content.querySelector('.bux-input-error-msg');
      this.errorSpan = tpl.content.querySelector(`#error-${this.idPrefixe}`);

      // Insert slot
      this.selectEl = tpl.content.querySelector('.bux-select-select');
      while (this.children.length > 0) {
        this.selectEl.appendChild(this.children[0]);
      }

      // Listener for change value
      this.selectEl.addEventListener('change', e => {
        this.setAttribute('data-value', e.target.value);
      });

      this.setLabelAndAccess();
      this.setClass();
      this.displayError();
      this.setWidth();
      this.setSteps();

      // Render it
      this.appendChild(tpl.content);
      this.isInit = true;
      this._instantiateOption();
    }

    ////////////////// Helper
    displayError() {
      if (this.state === 'error' && this.errorMsg) {
        this.errorDiv.style.display = '';
      } else {
        this.errorDiv.style.display = 'none';
      }
    }

    // Helper to set class
    setClass() {
      let classes = 'bux-select-wrap ';

      switch (this.layout) {
        case 'align':
          classes += 'bux-select-align ';
          break;
      }
      switch (this.state) {
        case 'valid':
          classes += 'bux-select-valid ';
          break;
        case 'error':
          classes += 'bux-select-error ';
          break;
        case 'empty':
        default:
          classes += 'bux-select-empty ';
          break;
      }
      if (this.nomargin) {
        classes += 'c-select-wrap-nomargin ';
      }

      this.wrap.className = classes;
    }

    // Helper to set label
    setLabelAndAccess() {
      this.required =
        this.hasAttribute('required') &&
        this.getAttribute('required') !== 'false';

      // Label Left
      if (this.label) {
        // This input is required
        if (this.required) {
          this.labelEl.innerHTML = `${this.label}<span aria-hidden="true"> *</span>`;
        } else {
          this.labelEl.innerHTML = this.label;
        }
      }

      // Label right
      if (this.labelRight) {
        this.labelRightEl.textContent = this.labelRight;
        this.labelRightEl.style.display = '';
      } else {
        this.labelRightEl.textContent = '';
        this.labelRightEl.style.display = 'none';
      }

      // Aria Label
      let a11yLabelTmp = '';
      if (this.label) a11yLabelTmp += this.label;
      if (this.labelRight) a11yLabelTmp += this.labelRight;
      if (this.required) a11yLabelTmp += '. Ce champ est obligatoire.';
      if (a11yLabelTmp) this.labelEl.setAttribute('aria-label', a11yLabelTmp);

      // Input required ?
      this.selectEl.required = this.required;
    }

    setWidth() {
      if (this.selectWidth)
        this.selectEl.setAttribute('style', `width:${this.selectWidth}px`);
    }

    setSteps() {
      if (this.stepIn === true) {
        const stepIn = document.createElement('span');
        stepIn.setAttribute('class', 'u-hidden-visually');
        stepIn.setAttribute('tabindex', 0);
        stepIn.setAttribute('aria-label', 'Début de la zone de saisie');
        this.wrap.insertBefore(stepIn, this.labelEl);
      }
      if (this.stepOut === true) {
        const stepOut = document.createElement('span');
        stepOut.setAttribute('class', 'u-hidden-visually');
        stepOut.setAttribute('tabindex', 0);
        stepOut.setAttribute('aria-label', 'Fin de la zone de saisie');
        this.wrap.appendChild(stepOut);
      }
    }

    _instantiateOption() {
      const options = Array.from(this.querySelectorAll('option'));

      if (typeof this._value === 'undefined') {
        return (this.selectEl.value = options[0].value);
      } else if (this._value.length === 0) {
        return (this.selectEl.value = options[0].value);
      } else {
        return (this.selectEl.value = this._value);
      }
    }

    template() {
      if (
        (uxEfs === 'cmb') |
        (uxEfs === 'cmmc') |
        (uxEfs === 'cmso') |
        (uxEfs === 'cmbpro') |
        (uxEfs === 'cmmcpro') |
        (uxEfs === 'cmsopro')
      ) {
        return `
        <div class="bux-select-wrap">
          <label class="bux-select-label" for="${this.idPrefixe}"></label>
          <select id="${this.idPrefixe}" class="bux-select-select"></select>
          <span class="bux-select-label-right" aria-hidden="true"></span>

          <div class="bux-input-error-msg">
                <span tabindex="0" id="error-${this.idPrefixe}">${this.errorMsg}</span>
          </div>
        `;
      } else if (uxEfs === 'azb') {
        return `
        <div class="bux-select-wrap">
          <label class="bux-select-label" for="${this.idPrefixe}"></label>
          <select id="${this.idPrefixe}" class="bux-select-select"></select>
          <span class="bux-select-label-right" aria-hidden="true"></span>

            <div class="bux-input-error-msg">
              <bux-message type="error" tabindex="0" id="error-${this.idPrefixe}">
                <p>${this.errorMsg}</p>
              </bux-message>
            </div>
          </div>
        `;
      }
    }
  }
);
