import BuxClass from '../../../../bux.class';
import './btn.styles.scss';

// import '../bux-svg/svg.component';

customElements.define(
  'bux-btn',
  class Btn extends BuxClass {
    ////////////////////// Constructor
    constructor() {
      super();
      this.isInit = false;
    }
    //////////////////////////

    //////////////// Attribute change
    static get observedAttributes() {
      return ['type', 'disabled', 'data-identifier', 'a11y-label', 'size'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;
      if (!this.isInit) return;

      switch (name) {
        case 'type':
          this.btn.setAttribute('class', this.getClass());
          break;
        case 'size':
          this.btn.setAttribute('class', this.getClass());
          break;
        case 'disabled':
          this.disabled =
            this.hasAttribute('disabled') &&
            this.getAttribute('disabled') !== 'false';
          this.btn.setAttribute('class', this.getClass());
          if (this.disabled) {
            this.btn.setAttribute('disabled', 'true');
            if (this.role === 'link' || this.role === 'link-external') {
              this.btn.setAttribute('aria-label', 'Indisponible');
              this.btn.removeAttribute('href');
            }
          } else {
            this.btn.removeAttribute('disabled');
            this.btn.setAttribute('aria-label', this.a11yLabel);
            if (this.role === 'link' || this.role === 'link-external') {
              this.btn.setAttribute('href', this.linkhref);
            }
          }
          break;
        case 'data-identifier':
          this.btn.setAttribute('id', this[camelName]);
          break;
        case 'a11y-label':
          this.btn.setAttribute('aria-label', this.a11yLabel);
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;

      this.type = this.getAttribute('type') || 'primary';
      this.size = this.getAttribute('size') || 'medium';
      this.disabled =
        this.hasAttribute('disabled') &&
        this.getAttribute('disabled') !== 'false';
      this.role = this.getAttribute('data-role') || 'button';
      this.a11yLabel = this.getAttribute('a11y-label') || '';
      this.linkhref = this.getAttribute('data-link') || '';
      this.identifier = this.getAttribute('data-identifier') || '';

      this.outlined =
        this.hasAttribute('outlined') &&
        this.getAttribute('outlined') !== 'false';

      this.icon = this.getAttribute('data-icon');

      const tpl = document.createElement('template');
      tpl.innerHTML = this.template();

      this.btn = tpl.content.querySelector('.btn-selector');

      if (this.icon) {
        const tplIcon = document.createElement('template');
        tplIcon.innerHTML = `<bux-svg
          data-icon="${this.icon}"
          data-class="c-btn--icon"></bux-svg>`;
        this.btn.appendChild(tplIcon.content);
      }

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.btn.appendChild(this.childNodes[0]);
      }

      this.appendChild(tpl.content);

      this.isInit = true;
    }

    // Helper to add class
    getClass() {
      let btnClass = 'c-btn ';
      if (this.type === 'primary') btnClass += 'c-btn--primary ';
      if (this.type === 'secondary') btnClass += 'c-btn--secondary ';
      if (this.type === 'novatio') btnClass += 'c-btn--novatio';
      if (this.type === 'svg') btnClass += 'c-btn--svg ';
      if (this.disabled) btnClass += 'is-disabled ';
      if (this.outlined) btnClass += 'c-btn--outlined ';
      if (this.size === 'small') btnClass += 'c-btn--small ';
      if (this.size === 'medium') btnClass += 'c-btn--medium ';
      if (this.size === 'large') btnClass += 'c-btn--large ';

      return btnClass;
    }

    template() {
      let tpl = '';
      switch (this.role) {
        case 'button':
        default:
          tpl = `<button class="btn-selector ${this.getClass()}"
          ${'' === this.a11yLabel ? '' : `aria-label="${this.a11yLabel}"`}
          ${this.disabled ? 'disabled' : ''}
          ${'' === this.identifier ? '' : `id="${this.identifier}"`}
          >
        </button>`;

          break;
        case 'link':
          tpl = `<a class="btn-selector ${this.getClass()}"
          ${
            '' === this.a11yLabel
              ? ''
              : this.disabled
              ? `aria-label="Indisponible"`
              : `aria-label="${this.a11yLabel}"`
          }
          ${
            '' === this.linkhref
              ? ''
              : this.disabled
              ? ''
              : `href="${this.linkhref}"`
          }
          ${'' === this.identifier ? '' : `id="${this.identifier}"`}
        >
        </a>`;
          break;
        case 'link-external':
          tpl = `<a class="btn-selector ${this.getClass()}"
          ${'' === this.identifier ? '' : `id="${this.identifier}"`}
          ${
            '' === this.linkhref
              ? ''
              : this.disabled
              ? ''
              : `href="${this.linkhref}"`
          }
          ${
            '' === this.a11yLabel
              ? ''
              : this.disabled
              ? `aria-label="Indisponible"`
              : `aria-label="${this.a11yLabel}"`
          }
        target="_blank" rel="noopener"
        >
        </a>`;
          break;
      }
      return tpl;
    }
  }
);
