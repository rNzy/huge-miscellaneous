export default function ElementAlignmentMixin(base) {
  class ElementAlignmentMixin extends base {
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
            this.container.style.marginLeft = 'auto';
            this.container.style.marginRight = 'auto';
            this.container.style.display = 'block';
          } else {
            this.container.style.marginLeft = '';
            this.container.style.marginRight = '';
            this.container.style.display = '';
          }
          break;
        case 'left':
          if (this.left) {
            this.container.style.marginRight = 'auto';
            this.container.style.display = 'block';
          } else {
            this.container.style.marginRight = '';
            this.container.style.display = '';
          }
          break;
        case 'right':
          if (this.right) {
            this.container.style.marginLeft = 'auto';
            this.container.style.display = 'block';
          } else {
            this.container.style.marginLeft = '';
            this.container.style.display = '';
          }
          break;
      }
    }
  }
  return ElementAlignmentMixin;
}
