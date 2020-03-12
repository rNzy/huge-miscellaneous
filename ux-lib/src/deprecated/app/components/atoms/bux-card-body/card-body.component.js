import BuxClass from '../../../../bux.class';
import './card-body.styles.scss';

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-card__body"></div>';

customElements.define(
  'bux-card-body',
  class CardBody extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Attribute change
    static get observedAttributes() {
      return ['layout'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      // Bad Choice
      if (!['grid-hero', 'columns-medium', 'default'].includes(newVal)) {
        this.layout = 'default';
        this.setAttribute('layout', 'default');
        return;
      }

      this.layout = newVal;

      if (!this.isInit) return;

      this.setLayout();
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;

      const nTpl = tpl.content.cloneNode(true);

      this.wrapSlot = nTpl.childNodes[0];

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        this.wrapSlot.appendChild(this.childNodes[0]);
      }

      if (!this.hasAttribute('layout')) this.setAttribute('layout', 'default');

      this.setLayout();

      // Insert your element in the dom
      this.appendChild(nTpl);

      this.isInit = true;
    }

    setLayout() {
      switch (this.layout) {
        case 'grid-hero':
          this.wrapSlot.classList.remove('columns-medium');
          this.wrapSlot.classList.add('o-card-grid');
          [...this.wrapSlot.children].forEach(item => {
            item.classList.add('o-card-grid__item');
          });
          break;
        case 'columns-medium':
          this.wrapSlot.classList.remove('o-card-grid');
          [...this.wrapSlot.children].forEach(item =>
            item.classList.remove('o-card-grid__item')
          );
          this.wrapSlot.classList.add('o-card-columns@md');
          break;
        case 'default':
          this.wrapSlot.classList.remove('o-card-grid');
          [...this.wrapSlot.children].forEach(item =>
            item.classList.remove('o-card-grid__item')
          );
          this.wrapSlot.classList.remove('o-card-columns@md');
          break;
      }
    }
  }
);
