import BuxClass from '../../../../bux.class';
import './container.styles.scss';

customElements.define(
  'bux-container',

  class Container extends BuxClass {
    static get observedAttributes() {
      return ['type', 'margin-top-md', 'margin-bottom-md'];
    }

    attributeChangedCallback() {
      this.setClasses();
    }

    connectedCallback() {
      this.classList.add('c-container');
    }

    setClasses() {
      const type = this.getAttribute('type');
      const maginTopMd =
        this.hasAttribute('margin-top-md') &&
        this.getAttribute('margin-top-md') !== false;

      const maginBottomMd =
        this.hasAttribute('margin-bottom-md') &&
        this.getAttribute('margin-bottom-md') !== false;

      let classTpl = `c-container c-container--${type}`;

      if (type.indexOf('dropdown') > -1) classTpl += ' c-container--dropdown';

      if (maginTopMd) classTpl += ' c-container--margin-top-md';

      if (maginBottomMd) classTpl += ' c-container--margin-bottom-md';

      this.className = classTpl;
    }
  }
);
