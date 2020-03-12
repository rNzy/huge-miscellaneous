import BuxClass from '../../../../bux.class';

// import '../../atoms/bux-select/select.component';
// import '../../atoms/bux-range/range.component';

customElements.define(
  'bux-range-select',
  class RangeSelect extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;
      this.isEventRemove = false;

      // Select
      this.state = 'empty'; // nodata, valid, error
      this.required = 'false';
      this.selectLabel = '';
      this.selectLabelRight = '';
      this.selectWidth = '';

      // Range
      this.rangeLabelLeft = '';
      this.rangeLabelRight = '';

      this.value = '0';
      this.valueMin = '0';
      this.valueMax = '12';
      this.step = '1';

      // Bind event handler
      this.handleChangeEvent = this.changeEvent.bind(this);
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'state',
        'required',
        'data-select-label',
        'data-select-label-right',
        'data-select-width',
        'data-range-label-left',
        'data-range-label-right',
        'data-value',
        'data-value-min',
        'data-value-max',
        'data-step'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;

      if (!this.isInit) return;

      switch (camelName) {
        case 'state':
        case 'required':
        case 'selectLabelRight':
        case 'selectWidth':
          this.buxSelect.setAttribute(name, this[camelName]);
          break;
        case 'selectLabel':
          this.buxSelect.setAttribute(name, this[camelName]);
          break;
        case 'rangeLabelLeft':
          this.buxRange.setAttribute(name, this[camelName]);
          break;
        case 'rangeLabelRight':
          this.buxRange.setAttribute(name, this[camelName]);
          break;
        case 'valueMin':
        case 'valueMax':
        case 'step':
          this.removeEvents();
          this.innerHTML = this.template();
          this.buxSelect = this.querySelector('bux-select');
          this.buxRange = this.querySelector('bux-range');
          this.addEvents();
          break;
        case 'value':
          this.buxSelect.setAttribute(name, this[camelName]);
          this.buxRange.setAttribute(name, this[camelName]);
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit && this.isEventRemove) this.addEvents();
      if (this.isInit) return;

      // Init attribut
      this.initAttr('state');
      this.initAttr('required');
      this.initAttr('data-select-label');
      this.initAttr('data-select-label-right');
      this.initAttr('data-select-width');
      this.initAttr('data-range-label-right');
      this.initAttr('data-range-label-left');
      this.initAttr('data-value-min');
      this.initAttr('data-value-max');
      this.initAttr('data-value');
      this.initAttr('data-step');

      // Render
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Select input and range
      this.buxSelect = tpl.content.querySelector('bux-select');
      this.buxRange = tpl.content.querySelector('bux-range');

      // Add listener
      this.addEvents();

      // Render it
      this.appendChild(tpl.content);

      this.isInit = true;
    }

    // Remove listener when wc unmount
    disconnectedCallback() {
      if (!this.isInit) return;
      this.removeEvents();
      this.isEventRemove = true;
    }

    ////////////////// Helper
    changeEvent(e) {
      this.setAttribute('data-value', e.target.value);
    }

    removeEvents() {
      this.buxRange.removeEventListener('input', this.handleChangeEvent);
      this.buxSelect.removeEventListener('change', this.handleChangeEvent);
      this.isEventRemove = false;
    }

    addEvents() {
      this.buxRange.addEventListener('input', this.handleChangeEvent);
      this.buxSelect.addEventListener('change', this.handleChangeEvent);
      this.isEventRemove = true;
    }

    // Helper to init Attr
    initAttr(attrName) {
      const attrCamel = this.toCamelCase(attrName);
      if (this.getAttribute(attrName) === '') {
        this[attrCamel] = '';
      } else {
        this.setAttribute(attrName, this[attrCamel]);
      }
    }

    // Create an Array from min to max by step
    makeArr(min, max, step) {
      const tmp = [];
      const minNb = Number(min);
      const maxNb = Number(max);
      const stepNb = Number(step);

      const nbStep = Math.floor((maxNb - minNb) / stepNb) + 1;

      for (let i = 0; i < nbStep; i++) {
        tmp.push(i * step + minNb);
      }

      return tmp;
    }

    // Make option for select
    makeOption() {
      const steps = this.makeArr(this.valueMin, this.valueMax, this.step);
      return steps.reduce((acc, step) => {
        acc += `<option value="${step}">${step}</option>`; // eslint-disable-line no-param-reassign
        return acc;
      }, []);
    }

    template() {
      return `
          <div class="bux-range-w-select">
            <bux-select
              state="${this.state}"
              required="${this.required}"
              data-label="${this.selectLabel}"
              data-label-right="${this.selectLabelRight}"
              data-select-width="${this.selectWidth}"
            >
              ${this.makeOption()}
            </bux-select>
            <bux-range
              data-label-left="${this.rangeLabelLeft}"
              data-label-right="${this.rangeLabelRight}"
              data-value="${this.value}"
              data-value-min="${this.valueMin}"
              data-value-max="${this.valueMax}"
              data-step="${this.step}"
            >
            </bux-range>
          </div>
        `;
    }
  }
);
