import BuxClass from '../../../../bux.class';
import './text.styles.scss';

customElements.define(
  'bux-text',

  class Text extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    connectedCallback() {
      if (this.isInit) return;

      this.size = this.getAttribute('size') || 'md';
      this.colorblack =
        this.hasAttribute('colorblack') &&
        this.getAttribute('colorblack') !== 'false';

      const tpl = document.createElement('template');
      tpl.innerHTML = '<span class="c-text"></span>';

      // Here you can select element
      this.wrapSlot = tpl.content.querySelector('.c-text');

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.wrapSlot.appendChild(this.childNodes[0]);
      }

      this.setSize();
      this.setColor();
      
      this.appendChild(tpl.content);
      this.isInit = true;
    }

    setColor() {
      if (this.colorblack) {
        this.wrapSlot.classList.add('c-text--black');
      } else {
        this.wrapSlot.classList.remove('c-text--black');
      }
    }

    setSize() {
      switch (this.size) {
        case 'sm':
          this.wrapSlot.classList.add('c-text--sm');
          break;
        case 'md':
          this.wrapSlot.classList.add('c-text--md');
          break;
        case 'xl':
          this.wrapSlot.classList.add('c-text--xl');
          break;
      }
    }
  }
);
