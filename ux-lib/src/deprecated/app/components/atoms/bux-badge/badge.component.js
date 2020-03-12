import BuxClass from '../../../../bux.class';
import './badges.styles.scss';

customElements.define(
  'bux-badge',

  class Badge extends BuxClass {

    static get observedAttributes() {
      return ['large'];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;

      this._large = this.hasAttribute('large') && this.getAttribute('large') !== 'false';
      const tpl = document.createElement('template');
      tpl.innerHTML = '<span class="c-badge"></span>';

      // Here you can select element
      this.wrapSlot = tpl.content.querySelector('.c-badge');

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.wrapSlot.appendChild(this.childNodes[0]);
      }
      this.setLarge();
      this.appendChild(tpl.content);
      this.isInit = true;
    }

    attributeChangedCallback(name) {
      const camelCaseName = this.toCamelCase(name);

      if (!this.isInit) return;

      switch (camelCaseName) {
        case '_large':
          this._large = this.hasAttribute('large') && this.getAttribute('large') !== 'false';
          this.setLarge();
          break;
      }
    }

    setLarge() {
      if (this._large) {
        this.wrapSlot.classList.add('c-badge--large');
      } else {
        this.wrapSlot.classList.remove('c-badge--large');
      }
    }
  }
);
