import BuxClass from '../../../../bux.class';
import './big-input.styles.scss';

customElements.define(
  'bux-big-input',
  class BigInput extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();

      this.idPrefixe =
        'bux-big-input-' + (Math.floor(Math.random() * 10000) + 2);

      // Bind event handler
      this.handleInputEvent = this.inputEvent.bind(this);

      this.value = '';
      this.state = 'empty'; // empty, valid, error
      this.required = 'false';
      this.currency = '€';
      this.label = '';
      this.errorMsg = '';
    }
    //////////////////////////

    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'data-value',
        'state',
        'required',
        'data-currency',
        'data-label',
        'data-error-msg'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);
      this[camelCaseName] = newVal;

      if (!this.isInit) return;

      switch (camelCaseName) {
        case 'value':
          this.input.value = this.value;
          break;
        case 'state':
          this.bigInputWrap.setAttribute('class', this.setClass());
          this.bigError.innerHTML = this.displayError();
          break;
        case 'required':
        case 'label':
          this.bigInputLabel.innerHTML = this.setLabel();
          break;
        case 'currency':
          this.bigInputCurrency.innerHTML = this.currency;
          break;
        case 'errorMsg':
          this.bigError.innerHTML = this.displayError();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mounted
    connectedCallback() {
      this.render();
      this.isInit = true;

      // Select Elemt
      this.input = this.querySelector('input');
      this.bigInputWrap = this.querySelector('.big-input-wrap'); // For color under input
      this.bigInputCurrency = this.querySelector(
        '.big-input-currency-wrap span'
      );
      this.bigInputLabel = this.querySelector('.big-input-label');
      this.bigError = this.querySelector('.big-input-error span');

      // Listen change input value
      this.input.addEventListener('input', this.handleInputEvent);

      // Init attribut
      this.initAttr('data-value');
      this.initAttr('state');
      this.initAttr('required');
      this.initAttr('data-currency');
      this.initAttr('data-label');
      this.initAttr('data-error-msg');
    }

    // Remove listener when wc unmount
    disconnectedCallback() {
      this.input.removeEventListener('input', this.handleInputEvent);
    }

    // @todo replace . to ,
    // remove all non alphanumeric
    // remove after to decimal
    // e.target.value is empty '' if invalid data inside ? on Firefox
    inputEvent(e) {
      this.setAttribute('data-value', e.target.value);
    }

    // Helper to init Attr
    initAttr(attrName) {
      const camelCaseName = this.toCamelCase(attrName);
      if (this.getAttribute(attrName) === '') {
        this[camelCaseName] = this.getAttribute(camelCaseName);
      } else {
        this.setAttribute(attrName, this[camelCaseName]);
      }
    }

    // Helper to set class
    setClass() {
      switch (this.state) {
        case 'valid':
          return 'big-input-wrap big-input-state-valid';
        case 'error':
          return 'big-input-wrap big-input-state-error';
        case 'empty':
        default:
          return 'big-input-wrap big-input-state-empty';
      }
    }

    // Helper to set label
    setLabel() {
      return (
        this.label +
        ('true' == this.required
          ? ` <span aria-hidden="true">*</span><span class="u-hidden-visually">. Note la devise est en ${
              this.currency
            }. Ce Champ est obligatoire</span>`
          : '')
      );
    }

    displayError() {
      return this.state === 'error'
        ? `<div tabindex="0">${this.errorMsg}</div>`
        : '';
    }

    render() {
      this.innerHTML = `
      <div class="big-input-main">
        <div class="big-input-sub-main">
          <div class="${this.setClass()}">
            <label for="${this.idPrefixe +
              '_biginput'}" class="big-input-label">${this.setLabel()}</label>
            <div class="big-input-logo-wrap">
              <input id="${this.idPrefixe +
                '_biginput'}" class="big-input-input" min="0" type="number">
              <div class="big-input-currency-wrap" aria-hidden="true">
                  <span>${this.currency}</span>
              </div>
            </div>
          </div>
          <span class="u-hidden-visually" tabindex="0"></span>
          <div class="big-input-error">
            <span>${this.displayError()}</span>
          </div>
        </div>
      </div>`;
    }
  }
);
