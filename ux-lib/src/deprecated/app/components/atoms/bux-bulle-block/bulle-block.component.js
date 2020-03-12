import BuxClass from '../../../../bux.class';

import './bulle-block.styles.scss';

customElements.define(
  'bux-bulle-block',
  class BulleBlock extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
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
      this.arrowPosition = this.getAttribute('arrow-position') || '';

      // Create template element
      const tpl = document.createElement('template');
      tpl.innerHTML = '<div class="c-bulle-block"></div>';

      // Here you can select element
      this.wrapSlot = tpl.content.querySelector('.c-bulle-block');

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.wrapSlot.appendChild(this.childNodes[0]);
      }

      this.setArrow();
      // Insert your element in the dom
      this.appendChild(tpl.content);
    }

    setArrow() {
      if (this.arrowPosition) {
        const classes = `c-bulle-block c-bulle-block--${this.arrowPosition}`;
        this.wrapSlot.setAttribute('class', classes);
      } else {
        this.wrapSlot.setAttribute(
          'class',
          'c-bulle-block c-bulle-block--2of3'
        );
      }
    }
  }
);
