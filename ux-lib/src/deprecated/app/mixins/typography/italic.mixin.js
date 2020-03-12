export default function ItalicMixin(base) {
  class ItalicMixin extends base {
    static get properties() {
      return {
        italic: {
          type: 'boolean'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;
      if (name === 'italic') {
        if (this.italic) this.container.style.fontStyle = 'italic';
        else this.container.style.fontStyle = '';
      }
    }
  }
  return ItalicMixin;
}
