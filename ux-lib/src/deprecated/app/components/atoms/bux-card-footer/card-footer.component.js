import BuxClass from '../../../../bux.class';
import './card-footer.styles.scss';

const tpl = document.createElement('template');
tpl.innerHTML = '<div class="c-card__footer"></div>';

customElements.define(
  'bux-card-footer',
  class CardFooter extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      // Do call it again if is was already init
      if (this.isInit) return;

      const nTpl = tpl.content.cloneNode(true);

      const wrapSlot = nTpl.childNodes[0];

      // Insert slot in previous selected element
      while (this.childNodes.length > 0) {
        wrapSlot.appendChild(this.childNodes[0]);
      }

      // Insert your element in the dom
      this.appendChild(nTpl);

      this.isInit = true;
    }
  }
);
