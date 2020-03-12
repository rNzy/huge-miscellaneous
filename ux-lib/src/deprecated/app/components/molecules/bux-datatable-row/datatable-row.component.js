import BuxClass from '../../../../bux.class';
const styles = require(`./datatable-row.styles.${uxEfs}.css`);

const template = document.createElement('template');
template.innerHTML = `
<style>
 ${styles}
</style>
<slot></slot>
`;

window.ShadyCSS && ShadyCSS.prepareTemplate(template, 'bux-datatable-row');

customElements.define(
  'bux-datatable-row',

  class DatatableRow extends BuxClass {
    constructor() {
      super();
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this._defaultSlot = this.shadowRoot.querySelector('slot');
    }

    connectedCallback() {
      window.ShadyCSS && ShadyCSS.styleElement(this);
      if (!this.hasAttribute('slot')) this.setAttribute('slot', 'tbody');
      if (!this.hasAttribute('role')) this.setAttribute('role', 'row');

      if (window.HTMLSlotElement) {
        this._defineCells();
      }
    }

    __allCells() {
      return Array.from(this.children);
    }

    _defineCells() {
      const cells = this.__allCells();
      cells.forEach(cell => {
        cell.setAttribute('role', 'cell');
      });
    }
  }
);
