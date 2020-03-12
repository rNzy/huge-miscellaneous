import BuxClass from '../../../../bux.class';

import './range.styles.scss';

const prefixes = [
  '-moz-range-track',
  '-webkit-slider-runnable-track',
  '-ms-fill-lower',
  '-ms-fill-upper'
];

customElements.define(
  'bux-range',
  class Range extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;

      this.idPrefixe = 'buxrange' + (Math.floor(Math.random() * 10000) + 2);

      // Bind event handler
      this.handleKeyEvent = this.keyEvent.bind(this);
      this.handleChangeEvent = this.changeEvent.bind(this);
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'data-label-left',
        'data-label-right',
        'data-label-middle',
        'data-label-middle-position',
        'data-value-min',
        'data-value-max',
        'data-value',
        'data-step',
        'data-dash-position'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;

      if (!this.isInit) return;

      switch (camelName) {
        case 'labelLeft':
          this.labelLeftElm.innerHTML = this.labelLeft;
          break;
        case 'labelRight':
          this.labelRightElm.innerHTML = this.labelRight;
          break;
        case 'labelMiddle':
          this.labelMiddleElm.innerHTML = this.labelMiddle;
          break;
        case 'valueMin':
          this.input.setAttribute('data-value-min', this.valueMin);
          this.input.setAttribute('aria-label', this.setAriaLabel());
          //this.input.setAttribute('aria-valuemin', this.valueMin);
          break;
        case 'valueMax':
          this.input.setAttribute('data-value-max', this.valueMax);
          this.input.setAttribute('aria-label', this.setAriaLabel());
          //this.input.setAttribute('aria-valuemax', this.valueMax);
          break;
        case 'step':
          this.input.setAttribute('data-step', this.step);
          break;
        case 'value':
          if (this.value == '') {
            this.value = oldVal;
            return;
          }
          this.input.value = this.value;
          this.input.setAttribute('data-value', this.value);
          this.input.setAttribute('aria-label', this.setAriaLabel());
          //this.input.setAttribute('aria-valuenow', this.value);
          break;
        case 'labelMiddlePosition':
          this.setMiddleLabelPos();
          break;
        case 'dashPosition':
          this.setDash();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;

      // Init attribut
      this.initAttr('data-label-left');
      this.initAttr('data-label-right');
      this.initAttr('data-value-min');
      this.initAttr('data-value-max');
      this.initAttr('data-value');
      this.initAttr('data-step');
      this.initAttr('data-label-middle', '');
      this.initAttr('data-label-middle-position', '');
      this.initAttr('data-dash-position', '');

      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Select Elemt
      this.input = tpl.content.querySelector('input');
      this.labelLeftElm = tpl.content.querySelector('.c-bux-range__value--min');
      this.labelRightElm = tpl.content.querySelector(
        '.c-bux-range__value--max'
      );
      this.labelMiddleElm = tpl.content.querySelector(
        '.c-bux-range__value--middle'
      );

      this.setMiddleLabelPos();
      this.setDash();

      // Listen change input value
      this.input.addEventListener('input', this.handleChangeEvent);

      // Key event
      this.input.addEventListener('keydown', this.handleKeyEvent);

      // Render it
      this.appendChild(tpl.content);

      this.isInit = true;
    }

    // Remove listener when wc unmount
    disconnectedCallback() {
      if (!this.isInit) return;
      this.input.removeEventListener('input', this.handleChangeEvent);
      this.input.removeEventListener('keydown', this.handleKeyEvent);
    }

    ////////////////// Helper

    // Helper to init Attr
    initAttr(attrName, value) {
      const attrCamel = this.toCamelCase(attrName);
      if (this.hasAttribute(attrName)) {
        this[attrCamel] = this.getAttribute(attrName);
      } else if (typeof value === 'undefined') {
        this.setAttribute(attrName, '');
      } else {
        this.setAttribute(attrName, value);
      }
    }

    changeEvent(e) {
      this.setAttribute('data-value', e.target.value);
      this.input.setAttribute('data-value', e.target.value);
    }

    keyEvent(e) {
      let newVal = 0;

      switch (e.which) {
        case 37: // left
        case 109: // minus on numpad
        case 54: // minus on number
          newVal = Number(this.value) - Number(this.step);
          if (newVal >= this.valueMin) {
            this.setAttribute('data-value', newVal);
          }
          break;
        case 39: // right
        case 107: // plus on numpad
        case 187: // plus on number
          newVal = Number(this.value) + Number(this.step);
          if (newVal <= this.valueMax) {
            this.setAttribute('data-value', newVal);
          }
          break;
      }
    }

    setAriaLabel() {
      return `La valeur actuelle est de ${this.value}. Le minimun est ${
        this.labelLeft
      } et le maximum est de ${this.labelRight}`;
    }

    setMiddleLabelPos() {
      if (this.labelMiddleElm) this.labelMiddleElm.style.left = this.labelMiddlepos;
    }

    /////// Handle Dash
    makeStyleDashRule(prefixe) {
      return (
        '#' +
        this.input.id +
        '.c-bux-range__input.c-bux-range__input--dash::' +
        prefixe +
        ' { background-size: ' +
        this.dashPos +
        ' 10px, auto !important }'
      );
    }

    setRangeSheet() {
      // Delete old Rules
      if (this.rangeSheet) {
        while (this.rangeSheet.cssRules.length > 0) {
          this.rangeSheet.deleteRule(0);
        }
        // Create a new styleSheet
      } else {
        this.rangeSheet = document.head.appendChild(
          document.createElement('style')
        ).sheet;
      }
    }

    setDash() {
      if (!this.dashPos) return;

      // Try to set the dash
      this.setRangeSheet();

      prefixes.forEach(prefixe => {
        try {
          this.rangeSheet.insertRule(this.makeStyleDashRule(prefixe), 0);
        } catch (e) {
          // Do nothing
        }
      });
    }

    // NB: tout les wrapper c-bux-range__input_wrap et c-bux-range__value_wrap
    // sont nécessaire pour avoir le même espacement entre Firefox et chrome
    // entre l'input et les span
    template() {
      return `
        <div class="c-bux-range">
          <div class="c-bux-range__input_wrap">
            <input 
              type="range"
              class="c-bux-range__input ${
                this.dashPos ? 'c-bux-range__input--dash' : ''
              }"
              min="${this.valueMin}"
              max="${this.valueMax}"
              value="${this.value}"
              step="${this.step}"
              aria-label="${this.setAriaLabel()}"
              id="${this.idPrefixe}"
            >
          </div>
          <div class="c-bux-range__value_wrap" aria-hidden="true">
            <span class="c-bux-range__value c-bux-range__value--min">${
              this.labelLeft
            }</span>
            ${
              '' === this.labelMiddle
                ? ''
                : `<span class="c-bux-range__value c-bux-range__value--middle">${
                    this.labelMiddle
                  }</span>`
            }
            <span class="c-bux-range__value c-bux-range__value--max">${
              this.labelRight
            }</span>
          </div>
        </div>
      `;
    }
  }
);
