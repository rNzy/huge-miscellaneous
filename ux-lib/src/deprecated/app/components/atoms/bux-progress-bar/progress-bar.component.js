import BuxClass from '../../../../bux.class';
import './progress-bar.styles.scss';

customElements.define(
  'bux-progress-bar',

  class Progress extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;
      // Get attribute on web component
      this.value =
        this.getAttribute('data-value-primary') ||
        this.getAttribute('data-value') ||
        0;
      this.valueSecond = this.getAttribute('data-value-secondary') || null;
      this.height = this.getAttribute('data-height') || null;
      this.hidevalues =
        this.hasAttribute('hidevalues') &&
        this.getAttribute('hidevalues') !== 'false';
      this.nomargin =
        this.hasAttribute('nomargin') &&
        this.getAttribute('nomargin') !== 'false';
      this.hidemobile =
        this.hasAttribute('hidemobile') &&
        this.getAttribute('hidemobile') !== 'false';

      this.size = this.getAttribute('size') || 'md';

      this.state = this.getAttribute('state') || 'empty';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      // Render it and select some children
      // this.render();

      // Select element
      this.progressBarPrimary = tpl.content.querySelector(
        '.c-progress__bar--primary'
      );
      this.progressBarSecondary = tpl.content.querySelector(
        '.c-progress__bar--secondary'
      );
      this.heightEl = tpl.content.querySelector('.c-progress');

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.progressBarPrimary.appendChild(this.childNodes[0]);
      }

      // Initi it
      this.setProgressPrimary(this.value);
      this.setProgressSecondary(this.valueSecond);
      this.setHeight(this.height);
      this.setClasses();
      this.hideValues();

      // Insert your element in the dom
      this.appendChild(tpl.content);

      this.setLabel();

      this.isInit = true;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'data-value',
        'data-value-primary',
        'data-value-secondary',
        'data-height',
        'hidevalues',
        'nomargin',
        'hidemobile',
        'data-label',
        'state'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;
      if (!this.isInit) return;
      switch (camelName) {
        case 'state':
          this.setClasses();
          break;
        case 'label':
          this.setLabel();
          break;
        case 'value':
        case 'value-primary':
          this.setProgressPrimary(newVal);
          break;
        case 'value-secondary':
          this.setProgressSecondary(newVal);
          break;
        case 'height':
          this.setHeight(newVal);
          break;
        case 'hidevalues':
          this.hidevalues =
            this.hasAttribute('hidevalues') &&
            this.getAttribute('hidevalues') !== 'false';
          this.hideValues();
          break;
        case 'nomargin':
          this.nomargin =
            this.hasAttribute('nomargin') &&
            this.getAttribute('nomargin') !== 'false';
          this.setClasses();
          break;
        case 'hidemobile':
          this.hidemobile =
            this.hasAttribute('hidemobile') &&
            this.getAttribute('hidemobile') !== 'false';
          this.setClasses();
      }
    }

    // Helper to change progress
    setProgressPrimary(value) {
      if (this.progressBarPrimary) {
        this.progressBarPrimary.style.width = value + '%';
        this.progressBarPrimary.setAttribute('aria-valuenow', value);
        if (this.hidevalues === false) {
          this.progressBarPrimary.textContent = value;
        }
      }
    }

    // Helper to change progress
    setProgressSecondary(valueSecond) {
      if (this.progressBarSecondary) {
        this.progressBarSecondary.style.width = valueSecond + '%';
        this.progressBarSecondary.setAttribute('aria-valuenow', valueSecond);
        if (this.hidevalues === false) {
          this.progressBarSecondary.textContent = valueSecond;
        }
      }
    }

    setHeight(height) {
      if (this.heightEl) {
        this.heightEl.style.height = height + 'px';
        this.progressBarPrimary.style.height = height + 'px';
        if (this.progressBarSecondary) {
          this.progressBarSecondary.style.height = height + 'px';
        }
      }
    }

    hideValues() {
      if (this.hidevalues === false) {
        this.progressBarPrimary.textContent = this.value;
        if (this.progressBarSecondary) {
          this.progressBarSecondary.textContent = this.valueSecond;
        }
      } else {
        this.progressBarPrimary.textContent = null;
        if (this.progressBarSecondary) {
          this.progressBarSecondary.textContent = null;
        }
      }
    }

    setClasses() {
      const baseClass = 'c-progress';
      let allClasses = baseClass;

      if (this.nomargin) {
        allClasses += ' c-progress--no-margin';
      }
      if (this.hidemobile) {
        allClasses += ' c-progress--no-mobile';
      }
      if (this.size === 'xs') {
        allClasses += ' c-progress--size-xs';
      }

      this.heightEl.setAttribute('class', allClasses);

      this.setState();
    }

    setState() {
      this.classList.remove(
        'c-progress--state__valid',
        'c-progress--state__error',
        'c-progress--state__warning'
      );
      switch (this.getAttribute('state')) {
        case 'valid':
          this.classList.add('c-progress--state__valid');
          break;
        case 'error':
          this.classList.add('c-progress--state__error');
          break;
        case 'warning':
          this.classList.add('c-progress--state__warning');
          break;
      }
    }

    setLabel() {
      const labelEl = this.querySelector('.c-progress-label');
      const label = this.getAttribute('data-label');

      if (labelEl && label) {
        labelEl.innerHTML = label;
        labelEl.style.display = '';
      } else {
        labelEl.style.display = 'none';
      }
    }

    template() {
      return `
      <div class="c-progress-label" style="display:none;"></div>
      <div class="c-progress">
        <div aria-hidden="true" class="c-progress__bar c-progress__bar--primary" role="progressbar" aria-valuenow="${
          this.value
        }" 
        aria-valuemin="0" aria-valuemax="100"></div>
        ${
          this.valueSecond
            ? `<div aria-hidden="true" class="c-progress__bar c-progress__bar--secondary" role="progressbar" aria-valuenow="${this.valueSecond}" aria-valuemin="0" aria-valuemax="100"></div>`
            : ''
        }
      </div>
      `;
    }
  }
);
