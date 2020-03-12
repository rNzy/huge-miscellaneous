import styleDefault from './textSize.style.css';

export default function TextSizeMixin(base) {
  /**
   * @mixin
   *
   * @property {"xs"|"sm"|"md"} [size="md"] - optional, set the font-size, default to md
   *
   * @cssprop --text-font-size-xs
   * @cssprop --text-font-size-sm
   * @cssprop --text-font-size-md
   * @cssprop --text-line-height-xs
   * @cssprop --text-line-height-sm
   * @cssprop --text-line-height-md
   */

  class TextSizeMixin extends base {
    static get properties() {
      return {
        size: {
          type: 'string'
        }
      };
    }

    constructor() {
      super();
    }

    static get style() {
      return styleDefault.toString();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;

      if (name === 'size') {
        //  Remove old class
        this.container.className = this.container.className.replace(
          /c-text--\w*/g,
          ''
        );

        switch (this.size) {
          case 'xs':
          case 'sm':
          case 'md':
          case 'lg':
          case 'xl':
          case 'xxl':
            this.container.classList.add('c-text--' + this.size);
            break;
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      if (this.container) this.container.classList.add('c-text');
    }
  }
  return TextSizeMixin;
}
