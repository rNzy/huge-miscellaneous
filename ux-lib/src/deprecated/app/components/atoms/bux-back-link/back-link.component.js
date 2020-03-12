import BuxClass from '../../../../bux.class';

import './back-link.styles.scss';

customElements.define(
  'bux-back-link',
  class BackLink extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['data-label', 'data-link'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelName = this.toCamelCase(name);
      this[camelName] = newVal;
      if (!this.isInit) return;
      switch (name) {
        case 'data-label':
          this.setLabel();
          break;
        case 'data-link':
          this.setLink();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;

      // Create template element
      this.innerHTML = `
        <a class="c-back-link-a">
          <bux-svg class="c-back-link-svg" data-icon="back-link"></bux-svg>
          <span class="c-back-link-txt"></span>
        </a>`;

      this.setLabel();
      this.setLink();

      // Insert your element in the dom
      this.isInit = true;
    }

    disconnectedCallback() {
      this.removeAttribute('data-link');
    }

    setLabel() {
      if (this.label) {
        this.querySelector('.c-back-link-txt').textContent = this.label;
        this.children[0].setAttribute('aria-label', this.label);
      } else {
        this.children[0].removeAttribute('aria-label');
      }
    }

    setLink() {
      if (this.link) {
        this.children[0].style.display = '';
        this.children[0].href = this.link;
      } else {
        this.children[0].href = '';
        this.children[0].style.display = 'none';
      }
      this.setBackLinkInHeader();
    }

    setBackLinkInHeader() {
      const buxHeader = document.querySelector('bux-header');
      if (buxHeader)
        buxHeader.setAttribute('data-back-link', this.link ? this.link : '');
    }
  }
);
