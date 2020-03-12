import BuxClass from '../../../../bux.class';
import './block.styles.scss';

customElements.define(
  'bux-block',
  class Block extends BuxClass {
    //////////////// Attribute change
    static get observedAttributes() {
      return [
        'layout',
        'noshadow',
        'nomarginbottom',
        'center',
        'wmax480',
        'nopaddingbottom',
        'nobackground'
      ];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      const camelCaseName = this.toCamelCase(name);

      switch (camelCaseName) {
        case 'layout':
          this[camelCaseName] = newVal;
          this.setPadding();
          break;
        case 'noshadow':
          this.noshadow =
            this.hasAttribute('noshadow') &&
            this.getAttribute('noshadow') !== 'false';
          this.setNoshadow();
          break;
        case 'nomarginbottom':
          this.nomarginbottom =
            this.hasAttribute('nomarginbottom') &&
            this.getAttribute('nomarginbottom') !== 'false';
          this.setNoMarginBottom();
          break;
        case 'center':
          this.center =
            this.hasAttribute('center') &&
            this.getAttribute('center') !== 'false';
          this.setCenter();
          break;
        case 'wmax480':
          this.wmax480 =
            this.hasAttribute('wmax480') &&
            this.getAttribute('wmax480') !== 'false';
          this.setWmax480();
          break;
        case 'nopaddingbottom':
          this.nopaddingbottom =
            this.hasAttribute('nopaddingbottom') &&
            this.getAttribute('nopaddingbottom') !== 'false';
          this.setPaddingBottom();
          break;
        case 'nobackground':
          this.nobackground =
            this.hasAttribute('nobackground') &&
            this.getAttribute('nobackground') !== 'false';
          this.setBackground();
          break;
      }
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      this.classList.add('c-block');

      // Init attribut
      // Call this function for every
      // Observed value
      this.initAttr('layout', 'default');
      this.noshadow =
        this.hasAttribute('noshadow') &&
        this.getAttribute('noshadow') !== 'false';

      this.nomarginbottom =
        this.hasAttribute('nomarginbottom') &&
        this.getAttribute('nomarginbottom') !== 'false';

      this.center =
        this.hasAttribute('center') && this.getAttribute('center') !== 'false';

      this.wmax480 =
        this.hasAttribute('wmax480') &&
        this.getAttribute('wmax480') !== 'false';

      this.nopaddingbottom =
        this.hasAttribute('nopaddingbottom') &&
        this.getAttribute('nopaddingbottom') !== 'false';

      this.nobackground =
        this.hasAttribute('nobackground') &&
        this.getAttribute('nobackground') !== 'false';

      this.setNoshadow();
      this.setPadding();
      this.setNoMarginBottom();
      this.setCenter();
      this.setWmax480();
      this.setPaddingBottom();
      this.setBackground();
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

    getPaddingClass() {
      switch (this.layout) {
        case 'flat':
          return 'c-block--padding-flat';
        case 'nopadding':
          return 'c-block--nopadding';
        case 'small':
          return 'c-block--padding-sm';
        case 'default':
          return 'c-block--padding-default';
        case 'medium':
          return 'c-block--padding-md';
        case 'large':
          return 'c-block--padding-large';
      }
      return 'c-block--padding-default';
    }

    setPadding() {
      this.classList.remove('c-block--nopadding');
      this.classList.remove('c-block--padding-sm');
      this.classList.remove('c-block--padding-default');
      this.classList.remove('c-block--padding-md');
      this.classList.remove('c-block--padding-large');
      this.classList.add(this.getPaddingClass());
    }

    setNoshadow() {
      if (this.noshadow) {
        this.classList.add('u-noshadow');
      } else {
        this.classList.remove('u-noshadow');
      }
    }

    setNoMarginBottom() {
      if (this.nomarginbottom) {
        this.classList.add('u-nomarginbottom');
      } else {
        this.classList.remove('u-nomarginbottom');
      }
    }

    setCenter() {
      if (this.center) {
        this.classList.add('c-block--center');
      } else {
        this.classList.remove('c-block--center');
      }
    }

    setWmax480() {
      if (this.wmax480) {
        this.classList.add('c-block--wmax480');
      } else {
        this.classList.remove('c-block--wmax480');
      }
    }

    setPaddingBottom() {
      if (this.nopaddingbottom) {
        this.classList.add('c-block--nopaddingbottom');
      } else {
        this.classList.remove('c-block--nopaddingbottom');
      }
    }

    setBackground() {
      if (this.nobackground) {
        this.classList.add('c-block--nobackground');
      } else {
        this.classList.add('c-block--background');
      }
    }
  }
);
