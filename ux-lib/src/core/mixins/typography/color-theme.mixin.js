import styleDefault from './color-theme.style.css';

export default function ColorThemeMixin(base) {
  /**
   * @mixin
   *
   * @prop {"part"|"pro"} [theme=part] - définit l'apparence du thème @deprecated
   * @prop {primary|secondary|success|positive|error} libColor - définit la couleur
   */

  class ColorThemeMixin extends base {
    static get properties() {
      return {
        theme: { type: 'string' },
        libColor: { type: 'string' }
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
        this.container.className = this.container.className.replace(
          /c-theme--\w*/g,
          ''
        );
        this.container.classList.add('c-theme--' + this.theme);
      } else if (name === 'lib-color') {
        this.container.className = this.container.className.replace(
          /c-theme-color--\w*/g,
          ''
        );
        this.container.classList.add('c-theme-color--' + this.libColor);
      }
    }
  }
  return ColorThemeMixin;
}
