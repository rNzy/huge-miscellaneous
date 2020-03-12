import styleDefault from './border.style.css';

export default function BorderMixin(base) {
  /**
   *
   *
   * @class BorderMixin
   * @extends {base}
   *
   * @prop {Boolean} borderTop - afficher une bordure au dessus
   * @prop {Boolean} borderRight - afficher une bordure a droite
   * @prop {Boolean} borderBottom - afficher une bordure en dessous
   * @prop {Boolean} borderLeft - afficher une bordure a gauche
   */
  class BorderMixin extends base {
    static get properties() {
      return {
        borderTop: {
          type: 'boolean'
        },
        borderRight: {
          type: 'boolean'
        },
        borderBottom: {
          type: 'boolean'
        },
        borderLeft: {
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
      if (!this.container) return;

      this.hasAttribute(name)
        ? this.container.classList.add(`c-${name}`)
        : this.container.classList.remove(`c-${name}`);
    }
  }
  return BorderMixin;
}
