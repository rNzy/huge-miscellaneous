export default function OutlinedMixin(base) {
  /**
   *
   *
   * @class OutlinedMixin
   * @extends {base}
   *
   * @prop {Boolean} type - outlined
   */
  class OutlinedMixin extends base {
    static get properties() {
      return {
        outlined: {
          type: 'boolean'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;

      if (name === 'outlined')
        this.setBooleanClass(this.outlined, 'c-btn--outlined');
    }
  }
  return OutlinedMixin;
}
