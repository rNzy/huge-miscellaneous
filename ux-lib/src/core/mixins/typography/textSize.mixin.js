import styleDefault from './textSize.style.css';

export default function TextSizeMixin(base) {
  /**
   * @mixin
   *
   * @prop {"xs"|"sm"|"md"|"lg"|"xl"|"xxl"} [libSize=md] - définit la taille du texte
   */

  class TextSizeMixin extends base {
    static get properties() {
      return {
        libSize: {
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
      const container = this.container || this;

      if (name === 'lib-size') {
        //  Remove old class
        container.className = container.className.replace(/c-text--\w*/g, '');

        switch (this.libSize) {
          case 'xs':
          case 'sm':
          case 'md':
          case 'lg':
          case 'xl':
          case 'xxl':
            container.classList.add('c-text--' + this.libSize);
            break;
        }
      }
    }

    connectedCallback() {
      if (super.connectedCallback) super.connectedCallback();
      const container = this.container || this;
      container.classList.add('c-text');
    }
  }
  return TextSizeMixin;
}
