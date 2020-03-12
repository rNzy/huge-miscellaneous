import styleDefault from './noPadding.style.css';

export default function NoPaddingMixin(base) {
  /**
   *
   * @class NoPaddingMixin
   * @extends {base}
   *
   * @prop {Boolean} noPadding - supprime le padding sur le container
   *
   */
  class NoPaddingMixin extends base {
    static get properties() {
      return {
        noPadding: {
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

      if (name === 'no-padding')
        this.setBooleanClass(this.noPadding, 'c-no-padding');
    }
  }
  return NoPaddingMixin;
}
