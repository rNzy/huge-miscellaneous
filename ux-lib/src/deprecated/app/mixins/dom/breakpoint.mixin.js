import styleDefault from './breakpoint.style.css';

export default function BreakpointMixin(base) {
  /**
   * Importe deux classes css .is-mobile et .is-desktop
   * qui permette d'afficher un élément que pour le type
   * d'écran choisi.
   *
   * @class BreakpointMixin
   * @extends {base}
   *
   * @prop {Boolean} isMobile - afficher qu'en mobile
   * @prop {Boolean} isDesktop - afficher qu'en desktop
   */
  class BreakpointMixin extends base {
    static get properties() {
      return {
        isMobile: {
          type: 'boolean'
        },
        isTablet: {
          type: 'boolean'
        },
        isDesktop: {
          type: 'boolean'
        }
      };
    }

    static get style() {
      return styleDefault.toString();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;

      switch (name) {
        case 'is-mobile':
          this.setBooleanClass(this.isMobile, 'is-mobile', this);
          this.setBooleanClass(this.isMobile, 'is-mobile', this.container);
          break;
        case 'is-tablet':
          this.setBooleanClass(this.isTablet, 'is-tablet', this);
          this.setBooleanClass(this.isTablet, 'is-tablet', this.container);
          break;
        case 'is-desktop':
          this.setBooleanClass(this.isDesktop, 'is-desktop', this);
          this.setBooleanClass(this.isDesktop, 'is-desktop', this.container);
          break;
      }
    }
  }
  return BreakpointMixin;
}
