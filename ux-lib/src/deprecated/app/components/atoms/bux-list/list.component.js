import BuxClass from '../../../../bux.class';
import './list.styles.scss';

customElements.define(
  'bux-list',
  class List extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['type', 'marginbottommedium'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);

      if (!this.isInit) return;

      switch (camelCaseName) {
        case 'type':
          this.type = newVal;
          this.setType();
          break;
        case 'marginbottommedium':
          this.marginbottommedium =
            this.hasAttribute('marginbottommedium') &&
            this.getAttribute('marginbottommedium') !== 'false';
          this.setMarginBottom();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;

      // Init attribut
      // Call this function for every
      // Observed value
      this.marginbottommedium =
        this.hasAttribute('marginbottommedium') &&
        this.getAttribute('marginbottommedium') !== 'false';
      this.label = this.getAttribute('data-label') || false;

      this.initAttr('type', 'nostyle');

      this.layout = this.getAttribute('layout') || 'default';

      // Create template element
      this.ul = document.createElement('ul');

      // Insert slot in previous selected element
      while (this.children.length > 0) {
        const li = document.createElement('li');
        li.appendChild(this.children[0]);
        this.ul.appendChild(li);
      }

      this.setType();
      this.setLayout();
      this.setLabel();
      this.setMarginBottom();

      // Insert your element in the dom
      this.appendChild(this.ul);
    }

    ////////////////// Helper
    // Helper to init Attr with default value
    initAttr(attrName, value) {
      if (this.hasAttribute(attrName)) {
        this[attrName] = this.getAttribute(attrName);
      } else if (typeof value === 'undefined') {
        this.setAttribute(attrName, '');
      } else {
        this[attrName] = value;
        this.setAttribute(attrName, value);
      }
    }

    setType() {
      if (!this.ul) return;
      switch (this.type) {
        case 'nostyle':
          this.ul.className = 'c-list c-list--nostyle';
          break;
        case 'disc':
          this.ul.className = 'c-list c-list--disc';
          break;
        case 'circle':
          this.ul.className = 'c-list c-list--circle';
          break;
        case 'square':
          this.ul.className = 'c-list c-list--square';
          break;
        case 'tablesimplelist':
          this.ul.className = 'c-list c-list--tablesimplelist';
          break;
      }
    }

    setLayout() {
      if (!this.ul) return;
      switch (this.layout) {
        case '2-columns-md':
          this.ul.classList.add('o-columns@md', 'o-columns--2');
          break;
        case '4-columns-md':
          this.ul.classList.add('o-columns@md', 'o-columns--4');
          break;
      }
    }

    setLabel() {
      if (this.label && !this.querySelector('.c-list__title')) {
        this.h3 = document.createElement('h3');
        this.h3.classList.add('c-list__title');
        this.h3.textContent = this.label;
        this.appendChild(this.h3);
      }
    }

    setMarginBottom() {
      if (!this.ul) return;
      if (this.marginbottommedium) {
        this.ul.classList.add('u-marginbottommedium');
      } else {
        this.ul.classList.remove('u-marginbottommedium');
      }
    }
  }
);
