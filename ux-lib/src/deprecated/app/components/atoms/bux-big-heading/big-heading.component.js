import BuxClass from '../../../../bux.class';

import './big-heading.styles.scss';

customElements.define(
  'bux-big-heading',
  class BigHeading extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['data-label', 'center'];
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
      this.label = this.getAttribute('data-label') || '';
      this.center =
        this.hasAttribute('center') && this.getAttribute('center') !== 'false';
      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = '<h1 class="c-big-heading"></h1>';
      this.wrapSlot = tpl.content.querySelector('.c-big-heading');
      this.setText();
      this.setClasses();

      // Insert your element in the dom
      this.appendChild(tpl.content);
    }

    setText() {
      if (this.label) {
        this.wrapSlot.textContent = this.label;
      }
    }

    setClasses() {
      if (this.center === true) {
        this.wrapSlot.setAttribute(
          'class',
          'c-big-heading c-big-heading--center'
        );
      }
    }
  }
);
