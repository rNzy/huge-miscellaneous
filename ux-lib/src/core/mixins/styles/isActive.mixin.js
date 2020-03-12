export default function IsActiveMixin(base) {
  /**
   * @class IsActiveMixin
   * @extends {base}
   *
   * @prop {Boolean} active - rajoute une classe is-active pour styliser l'état du composant
   */
  class IsActiveMixin extends base {
    static get properties() {
      return {
        active: { type: 'boolean' }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;

      if (name === 'active') {
        this.setBooleanClass(this.active, 'is-active');
      }
    }
  }
  return IsActiveMixin;
}
