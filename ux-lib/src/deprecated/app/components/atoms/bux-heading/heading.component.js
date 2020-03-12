import BuxClass from '../../../../bux.class';
import './heading.styles.scss';

// import '../bux-svg/svg.component';

customElements.define(
  'bux-heading',

  class Heading extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['a11y-expanded', 'data-identifier', 'data-label', 'autofocus'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;
      if (!this.isInit) return;
      switch (name) {
        case 'data-identifier':
          if (this.headingEl) this.headingEl.id = this[camelName];
          break;
        case 'a11y-expanded':
          if (this.btn) this.btn.setAttribute('aria-expanded', newVal);
          break;
        case 'data-label':
          this.label = newVal;
          this.setLabel();
          break;
        case 'autofocus':
          this.setAutofocus();
      }
    }

    //////////////// Life Cycle
    connectedCallback() {
      if (this.isInit) return;
      this.isInit = true;

      this.level = this.getAttribute('data-level') || '1';
      this.identifier = this.getAttribute('data-identifier') || '';
      this.icon = this.getAttribute('data-icon') || '';
      this.type = this.getAttribute('type') || 'default';
      this.label = this.getAttribute('data-label') || false;
      this.toast = this.getAttribute('data-toast') || '';

      this.setHeading(this.level);
      this.templateDropDown();

      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      this.btn = tpl.content.querySelector('.bux-heading-btn');
      this.headingEl = tpl.content.querySelector(`h${this.level}`);

      // Here you select element
      this.wrapSlot = tpl.content.querySelector('.bux-heading-label');

      // Use label if exists otherwise use inner html
      if (this.label) {
        this.innerHTML = '';
        this.setLabel();
      } else {
        while (this.childNodes.length > 0) {
          this.wrapSlot.appendChild(this.childNodes[0]);
        }
      }

      this.appendChild(tpl.content);
      this.setAutofocus();
    }

    setHeading(level) {
      switch (level) {
        case '1':
          this.class = 'c-heading-alpha';
          break;
        case '2':
          this.class = 'c-heading-bravo';
          break;
        case '3':
          this.class = 'c-heading-charlie';
          break;
        case '4':
          this.class = 'c-heading-dorie';
          break;
        case '5':
          this.class = 'c-heading-esther';
          break;
        case '6':
          this.class = 'c-heading-fanch';
          break;
      }
    }

    setLabel() {
      this.wrapSlot.innerHTML = this.label;
      // Set it invisible if no label
      if (this.label) {
        this.headingEl.removeAttribute('aria-hidden', 'true');
      } else {
        this.headingEl.setAttribute('aria-hidden', 'true');
      }
    }

    setAutofocus() {
      this.autofocus =
        this.hasAttribute('autofocus') &&
        this.getAttribute('autofocus') !== 'false';
      if (this.autofocus) {
        this.setAttribute('tabindex', '0');
        this.focus();
      }
    }

    templateDropDown() {
      if (this.type === 'dropdown') {
        this.a11yExpanded = this.getAttribute('a11y-expanded') || 'false';
        this.a11yControls = this.getAttribute('a11y-controls') || 'false';
        // Overide template
        this.template = () => `
          <h${this.level} >
            <div
              class="bux-heading-btn ${this.class}"
              role="button"
              aria-expanded="${this.a11yExpanded}"
              aria-controls="${this.a11yControls}"
              tabindex="0"
              ${'' === this.identifier ? '' : `id="${this.identifier}"`}
            >
              <span>
                ${
                  this.icon === ''
                    ? ''
                    : `<bux-svg data-icon="${this.icon}"></bux-svg>`
                }
                <span class="bux-heading-label">${
                  this.label ? this.label : ''
                }</span>
              </span>
              <bux-svg data-icon="arrow" class="bux-drop-down"></bux-svg>
            </div>
          </h${this.level}>
        `;
      }
    }

    template() {
      return `
          <h${this.level}
            ${'' === this.identifier ? '' : `id="${this.identifier}"`}
            class="${this.class}">
            ${
              this.icon === ''
                ? ''
                : `<bux-svg data-icon="${this.icon}"></bux-svg>`
            }
            <span class="bux-heading-label"></span>
            ${
              this.toast === ''
                ? ''
                : `<bux-btn id="${this.toast}Btn" type="svg" a11y-label="En savoir plus sur ${
                  this.label ? this.label : ''
                }"><bux-svg data-icon="help" data-class="c-icon"></bux-svg></bux-btn>`
            }
          </h${this.level}>
        `;
    }
  }
);
