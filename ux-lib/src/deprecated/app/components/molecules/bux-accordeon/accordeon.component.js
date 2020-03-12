import BuxClass from '../../../../bux.class';

// import '../../atoms/bux-accordeon-item/accordeon-item.component';

customElements.define(
  'bux-accordeon',
  class AccordeonClass extends BuxClass {

    constructor() {
      super();
      this.isInit = false;
    }

    //////////////// Life Cycle
    // Component is mount
    connectedCallback() {
      if (this.isInit) return;
      this.setAttribute('role', 'list');
      this.buxAccorItems = this.querySelectorAll('bux-accordeon-item');
      this.buxAccorItems.forEach(buxAccorItem => {
        buxAccorItem.setAttribute('role', 'listitem');
      });

      this.isInit = true;
    }

  }
);