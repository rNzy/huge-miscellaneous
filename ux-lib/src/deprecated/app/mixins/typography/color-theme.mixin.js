import styleDefault from './color-theme.style.css';

export default function ColorThemeMixin(base) {
  /**
   * @mixin
   *
   * @property {"part"|"pro"} [theme="part"] - optional, set the color theme
   *
   * @cssprop --color-theme-part
   * @cssprop --color-theme-pro
   * @cssprop --color-theme-light
   */

  class ColorThemeMixin extends base {
    static get properties() {
      return {
        theme: {
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
      if (name === 'theme') {
        switch (this.theme) {
          case 'part':
          case 'pro':
          case 'light':
          case 'dark':
          case 'white':
          case 'error':
          case 'success':
            this.container.classList.add('c-theme--' + this.theme);
            break;
        }
      }
    }
  }
  return ColorThemeMixin;
}
