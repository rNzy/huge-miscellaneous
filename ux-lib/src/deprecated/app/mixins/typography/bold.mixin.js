export default function BoldMixin(base) {
  class BoldMixin extends base {
    static get properties() {
      return {
        bold: {
          type: 'boolean'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;
      if (name === 'bold') {
        if (this.bold) this.container.style.fontWeight = 'bold';
        else this.container.style.fontWeight = '';
      }
    }
  }
  return BoldMixin;
}
