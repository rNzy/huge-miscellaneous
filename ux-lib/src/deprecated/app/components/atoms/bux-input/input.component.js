import BuxClass from '../../../../bux.class';
import './input.styles.scss';

// const tpl = document.createElement('template');
// tpl.innerHTML = `
// <style>
// ${String(styleDefault)}
// </style>
// <div class="js-container c-row">
//   <slot></slot>
//   <slot name="link"></slot>
// </div>
// `;

customElements.define(
  'bux-input',
  class Input extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      if (uxEfs === 'azb') {
        return [
          'data-value',
          'state',
          'data-label',
          'required',
          'data-error-msg',
          'type',
          'data-value-min',
          'data-value-max',
          'data-step',
          'data-icon-left-ay11',
          'data-icon-right-ay11'
        ];
      } else {
        return [
          'layout',
          'data-value',
          'state',
          'data-label',
          'data-label-right',
          'required',
          'data-input-width',
          'data-error-msg',
          'type',
          'data-value-min',
          'data-value-max',
          'data-step',
          'data-placeholder',
          'data-list',
          'data-icon-left',
          'data-icon-right',
          'data-icon-left-ay11',
          'data-icon-right-ay11',
          'data-autocomplete',
          'show-password'
        ];
      }
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);
      if (name !== 'data-value') {
        this[camelCaseName] = newVal;
      }

      if (!this.isInit) return;

      switch (camelCaseName) {
        case 'autocomplete':
          this.setAutocomplete();
          break;
        case 'layout':
          this.setClass();
          break;
        case 'state':
          this.setState();
          break;
        case 'required':
        case 'label':
          this.setLabelAndAccess();
          break;
        case 'labelRight':
          this.setLabelAndAccess();
          break;
        case 'inputWidth':
          this.setWidth();
          break;
        case 'errorMsg':
          this.errorSpan.innerHTML = this.errorMsg;
          this.displayError();
          break;
        case 'valueMin':
        case 'valueMax':
        case 'valueStep':
          this.setMinMaxStep();
          break;
        case 'value':
          this.setValue();
          break;
        case 'iconLeft':
        case 'iconRight':
        case 'iconLeftAy11':
        case 'iconRightAy11':
          this.setIcon();
          break;
        case 'type':
          this.setType();
          break;
        case 'show-password':
          if (this.querySelector('.bux-input-ico-right')) this._showPassword();
          break;
      }
    }

    set value(value) {
      this.setAttribute('data-value', value);
    }

    get value() {
      return this.getAttribute('data-value');
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;

      this.idPrefixe = 'bux-input-' + Math.floor(Math.random() * 10000) + 2;

      this.layout = this.getAttribute('layout') || null;

      this.state = this.getAttribute('state') || 'empty';
      this.label = this.getAttribute('data-label') || null;
      this.labelRight = this.getAttribute('data-label-right') || null;

      this.inputWidth = this.getAttribute('data-input-width') || null;
      this.type = this.getAttribute('type') || 'text';
      this.placeholder = this.getAttribute('data-placeholder') || null;
      this.errorMsg = this.getAttribute('data-error-msg') || null;

      this.valueMin = this.getAttribute('data-value-min') || null;
      this.valueMax = this.getAttribute('data-value-max') || null;
      this.valueStep = this.getAttribute('data-step') || null;
      this.list = this.getAttribute('data-list') || null;
      this.iconLeft = this.getAttribute('data-icon-left') || null;
      this.iconRight = this.getAttribute('data-icon-right') || null;

      this.required =
        this.hasAttribute('required') &&
        this.getAttribute('required') !== 'false';

      this.stepIn =
        this.hasAttribute('a11y-step-in') &&
        this.getAttribute('a11y-step-in') !== 'false';

      this.stepOut =
        this.hasAttribute('a11y-step-out') &&
        this.getAttribute('a11y-step-out') !== 'false';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // input Elemt
      this.IIwrap = tpl.content.querySelector('.bux-input-input-wrap');
      this.wrap = tpl.content.querySelector('.bux-input-wrap');

      this.labelRightEl = tpl.content.querySelector('.bux-input-unit');

      this.errorDiv = tpl.content.querySelector('.bux-input-error-msg');
      this.errorSpan = tpl.content.querySelector(`#error-${this.idPrefixe}`);

      this.inputEl = tpl.content.querySelector('.bux-input-input');
      this.labelEl = tpl.content.querySelector('.bux-input-label');

      this.isPasswordType = this.type === 'password' ? true : false;

      this.setState();
      this.setLabelAndAccess();
      this.setWidth();
      this.setMinMaxStep();
      this.setValue();
      this.setSteps();
      this.setIcon();
      this.setType();
      this.setAutocomplete();

      if (this.hasAttribute('show-password')) {
        this._showPassword();
      }

      this.addListener();

      this.displayError();

      // this.oldVal = this.inputEl.value;

      // Render it
      this.appendChild(tpl.content);

      this.isInit = true;
    }

    addListener() {
      this.inputEl.addEventListener('focus', () => {
        this.dispatchEvent(new Event('focus'));
      });

      this.inputEl.addEventListener('input', e => {
        this.setAttribute('data-value', e.target.value);
      });
    }

    setAutocomplete() {
      if (this.autocomplete) {
        this.inputEl.setAttribute('autocomplete', this.autocomplete);
      } else {
        this.inputEl.removeAttribute('autocomplete');
      }
    }

    setType() {
      this.inputEl.setAttribute('type', this.type);
    }

    setValue() {
      this.inputEl.value = this.value;
    }

    ////////////////// Helper
    setState() {
      this.setClass();
      if (this.state === 'error') {
        this.inputEl.setAttribute(
          'aria-describedby',
          `error-${this.idPrefixe}`
        );
      } else {
        this.inputEl.removeAttribute('aria-describedby');
      }
      this.displayError();
    }

    // Helper to set class
    setClass() {
      let classes = 'bux-input-wrap ';

      switch (this.layout) {
        case 'align':
          classes += 'bux-input-align ';
          break;
      }

      switch (this.state) {
        case 'valid':
          classes += 'bux-input-valid';
          break;
        case 'error':
          classes += 'bux-input-error';
          break;
        case 'empty':
        default:
          classes += 'bux-input-wrap bux-input-empty';
          break;
      }

      this.wrap.className = classes;
    }

    // Helper to set label
    setLabelAndAccess() {
      // set required
      this.required =
        this.hasAttribute('required') &&
        this.getAttribute('required') !== 'false';

      // Label left
      let labelTmp = '';
      let labelEl = null;

      if (this.label) labelTmp += this.label;
      if (this.required) {
        labelEl = document.createElement('span');
        labelEl.setAttribute('aria-hidden', true);
        labelEl.textContent = ' *';
      }
      this.labelEl.textContent = labelTmp;
      if (labelEl !== null) {
        this.labelEl.appendChild(labelEl);
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
      this.inputEl.required = this.required;
    }

    setMinMaxStep() {
      if (
        this.type === 'number' ||
        this.type === 'range' ||
        this.type === 'date'
      ) {
        if (this.valueMin) {
          this.inputEl.setAttribute('min', this.valueMin);
        }

        if (this.valueMax) {
          this.inputEl.setAttribute('max', this.valueMax);
        }

        if (this.valueStep) {
          this.inputEl.setAttribute('step', this.valueStep);
        }
      }
    }

    setWidth() {
      if (Number(this.inputWidth)) {
        this.inputEl.setAttribute(
          'style',
          `width:${this.inputWidth}px;flex-grow:inherit;`
        );
      } else {
        this.inputEl.removeAttribute('style');
      }
    }

    displayError() {
      if (this.state === 'error' && this.errorMsg) {
        this.errorDiv.style.display = '';
      } else {
        this.errorDiv.style.display = 'none';
      }
    }

    setSteps() {
      if (this.stepIn === true) {
        const stepIn = document.createElement('span');
        stepIn.setAttribute('class', 'u-hidden-visually');
        stepIn.setAttribute('tabindex', 0);
        stepIn.setAttribute('aria-label', 'Début de la zone de saisie');

        if (uxEfs === 'azb') {
          this.wrap.insertBefore(stepIn, this.inputEl);
        } else {
          this.wrap.insertBefore(stepIn, this.labelEl);
        }
      }
      if (this.stepOut === true) {
        const stepOut = document.createElement('span');
        stepOut.setAttribute('class', 'u-hidden-visually');
        stepOut.setAttribute('tabindex', 0);
        stepOut.setAttribute('aria-label', 'Fin de la zone de saisie');
        this.wrap.appendChild(stepOut);
      }
    }

    setIcon() {
      if (this.iconLeft) {
        this.inputEl.classList.add('has-icon-left');
        let iconLeftEl = this.querySelector('.bux-input-ico-left');

        if (iconLeftEl) {
          iconLeftEl.setAttribute('data-icon', this.iconLeft);
        } else {
          iconLeftEl = document.createElement('bux-svg');
          iconLeftEl.setAttribute('data-icon', this.iconLeft);
          iconLeftEl.classList.add('bux-input-ico-left');
          this.IIwrap.insertBefore(iconLeftEl, this.inputEl);
        }

        iconLeftEl.setAttribute(
          'aria-label',
          this.iconLeftAy11 ? this.iconLeftAy11 : ''
        );
      } else {
        this.inputEl.classList.remove('has-icon-left');
      }

      if (this.iconRight) {
        this.inputEl.classList.add('has-icon-right');
        let iconRightEl = this.querySelector('.bux-input-ico-right');

        if (this.isPasswordType === true) {
          if (iconRightEl) {
            iconRightEl.setAttribute('data-icon', this.iconRight);
          } else {
            let buttonRightEl = document.createElement('bux-btn');
            buttonRightEl.setAttribute('type', 'svg');
            buttonRightEl.classList.add('btn-ico-right');

            iconRightEl = document.createElement('bux-svg');
            iconRightEl.setAttribute('data-icon', this.iconRight);
            iconRightEl.classList.add('bux-input-ico-right');

            buttonRightEl.appendChild(iconRightEl);
            this.IIwrap.insertBefore(buttonRightEl, this.inputEl.nextSibling);
          }
        } else {
          if (iconRightEl) {
            iconRightEl.setAttribute('data-icon', this.iconRight);
          } else {
            iconRightEl = document.createElement('bux-svg');
            iconRightEl.setAttribute('data-icon', this.iconRight);
            iconRightEl.classList.add('bux-input-ico-right');
            this.IIwrap.insertBefore(iconRightEl, this.inputEl.nextSibling);
          }
        }

        iconRightEl.setAttribute(
          'aria-label',
          this.iconRightAy11 ? this.iconRightAy11 : ''
        );
      } else {
        this.inputEl.classList.remove('has-icon-right');
      }
    }

    template() {
      if (
        uxEfs === 'cmb' ||
        uxEfs === 'cmmc' ||
        uxEfs === 'cmso' ||
        uxEfs === 'cmbpro' ||
        uxEfs === 'cmmcpro' ||
        uxEfs === 'cmsopro'
      ) {
        return `
      <div class="bux-input-wrap">
          <label class="bux-input-label" for="${this.idPrefixe}"></label>
          <div class="bux-input-input-wrap">
            <input
              class="bux-input-input"
              id="${this.idPrefixe}"
              ${this.placeholder ? `placeholder="${this.placeholder}"` : ''}
              ${this.list ? `list="${this.list}"` : ''}
              ></input>
              <span class="bux-input-unit" aria-hidden="true"></span>
          </div>

          <div class="bux-input-error-msg">
            <span tabindex="0" id="error-${this.idPrefixe}">${
          this.errorMsg
        }</span>
          </div>
      </div>
    `;
      }
      if (uxEfs === 'azb') {
        return `
      <div class="bux-input-wrap bux-input-input-wrap">
        <input
          class="bux-input-input bux-input-input--floating "
          id="${this.idPrefixe}"
          placeholder=" "
          ${this.list ? `list="${this.list}"` : ''}
          ></input>
          <span class="bux-input-unit" aria-hidden="true"></span>
          <label class="bux-input-label bux-input-label--floating" for="${
            this.idPrefixe
          }">
          Ceci est le label</label>


          <div class="bux-input-error-msg">

        <bux-message type="error" tabindex="0" id="error-${this.idPrefixe}">
          <p>${this.errorMsg}</p>
        </bux-message>
        </div>
      </div>
    `;
      }
    }

    set showpassword(value) {
      const isShowPassword = Boolean(value);
      if (isShowPassword) this.setAttribute('show-password', '');
      else this.removeAttribute('show-password');
    }

    get showpassword() {
      return this.hasAttribute('show-password');
    }

    _toggleShowHidePassword() {
      switch (this.getAttribute('type')) {
        case 'password':
          this.setAttribute('type', 'text');
          this.querySelector('.bux-input-ico-right').setAttribute(
            'data-icon',
            'eye-blocked'
          );
          break;
        default:
          this.setAttribute('type', 'password');
          this.querySelector('.bux-input-ico-right').setAttribute(
            'data-icon',
            'eye'
          );
          break;
      }
    }

    _showPassword() {
      if (this.inputEl.getAttribute('type') === 'password') {
        this.setAttribute('data-icon-right', 'eye');
      } else if (this.inputEl.getAttribute('type') === 'text') {
        this.setAttribute('data-icon-right', 'eye-blocked');
      }
      this.setIcon();

      setTimeout(() => {
        this.querySelector('.btn-ico-right').addEventListener('click', () => {
          this.querySelector('.c-btn').setAttribute('type', 'button');
          this._toggleShowHidePassword();
        });
      }, 0);
    }
  }
);
