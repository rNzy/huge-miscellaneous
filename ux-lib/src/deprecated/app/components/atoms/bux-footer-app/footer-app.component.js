import BuxClass from '../../../../bux.class';

import './footer-app.styles.scss';

customElements.define(
  'bux-footer-app',

  class FooterBeveled extends BuxClass {
    static get observedAttributes() {
      return ['beveled', 'beveled-mobile'];
    }

    constructor() {
      super();
      this.isInit = false;
    }

    attributeChangedCallback(name) {
      switch (name) {
        case 'beveled':
          this.setBevel();
          break;
        case 'beveled-mobile':
          this.setBevelMobile();
          break;
      }
    }
    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;
      this.isInit = true;
      this.beveled =
        this.hasAttribute('beveled') &&
        this.getAttribute('beveled') !== 'false';
      this.beveledMobile =
        this.hasAttribute('beveled-mobile') &&
        this.getAttribute('beveled-mobile') !== 'false';
      // Create template element
      this.classList.add('c-footer-app');
      this.type = this.getAttribute('type');

      // Insert slot in previous selected element
      // while (this.childNodes.length > 0) {
      //   this.innerHTML.appendChild(this.childNodes[0]);
      // }
      this.setBevel();
      this.setBevelMobile();
      // Insert your element in the dom
      // this.appendChild(tpl.content);
    }

    setBevel() {
      if (this.beveled == true) {
        this.classList.add('c-footer-app--beveled');
      }
    }

    setBevelMobile() {
      if (this.beveledMobile == true) {
        this.classList.add('c-footer-app--beveled-mobile');
      }
    }
  }
);
