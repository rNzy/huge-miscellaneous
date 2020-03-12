export default function TextAlignmentMixin(base) {
  class TextAlignmentMixin extends base {
    static get properties() {
      return {
        center: {
          type: 'boolean'
        },
        left: {
          type: 'boolean'
        },
        right: {
          type: 'boolean'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;
      switch (name) {
        case 'center':
          if (this.center) {
            this.container.style.textAlign = 'center';
            this.container.style.display = 'block';
          } else {
            this.container.style.textAlign = 'normal';
            this.container.style.display = '';
          }
          break;
        case 'left':
          if (this.left) {
            this.container.style.textAlign = 'left';
            this.container.style.display = 'block';
          } else {
            this.container.style.textAlign = 'normal';
            this.container.style.display = '';
          }
          break;
        case 'right':
          if (this.right) {
            this.container.style.textAlign = 'right';
            this.container.style.display = 'block';
          } else {
            this.container.style.textAlign = 'normal';
            this.container.style.display = '';
          }
          break;
      }
    }
  }
  return TextAlignmentMixin;
}
