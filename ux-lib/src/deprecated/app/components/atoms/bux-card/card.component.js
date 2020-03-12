import BuxClass from '../../../../bux.class';
import './card.styles.scss';

// import '../../atoms/bux-card-header/card-header.component';
// import '../../atoms/bux-card-body/card-body.component';
// import '../../atoms/bux-card-footer/card-footer.component';

const tpl = document.createElement('template');
tpl.innerHTML = '<section class="c-card"></section>';

customElements.define(
  'bux-card',
  class Card extends BuxClass {
    constructor() {
      super();
      this.isInit = false;
    }

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
