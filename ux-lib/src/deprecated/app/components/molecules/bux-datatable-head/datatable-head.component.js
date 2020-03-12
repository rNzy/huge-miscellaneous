import BuxClass from '../../../../bux.class';
const styles = require(`./datatable-head.styles.${uxEfs}.css`);

const tpl = document.createElement('template');
tpl.innerHTML = `
<style>
 ${styles}
</style>
<slot></slot>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(tpl, 'bux-datatable-head');

customElements.define(
  'bux-datatable-head',

  class DatatableHead extends BuxClass {
    constructor() {
      super();
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(tpl.content.cloneNode(true));
      this._defaultSlot = this.shadowRoot.querySelector('slot');
    }

    connectedCallback() {
      window.ShadyCSS && ShadyCSS.styleElement(this);
      if (!this.hasAttribute('slot')) this.setAttribute('slot', 'thead');
      if (!this.hasAttribute('role')) this.setAttribute('role', 'row');

      this._defineCells();
    }

    __allCells() {
      return Array.from(this.children);
    }

    _defineCells() {
      if (window.HTMLSlotElement) {
        const cells = this.__allCells();
        cells.forEach(cell => {
          cell.setAttribute('role', 'columnheader');
          cell.setAttribute('aria-sort', 'none');
        });
      }
    }
  }
);
