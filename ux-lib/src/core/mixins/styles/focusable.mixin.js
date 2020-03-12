import styleDefault from './focusable.style.css';

export default function BackgroundMixin(base) {
  /**
   * @class BackgroundMixin
   * @extends {base}
   *
   * @prop {Boolean} focusable - rajoute une classe c-container--focusable
   */
  class FocusableMixin extends base {
    static get properties() {
      return {
        focusable: { type: 'boolean' }
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

      if (name === 'focusable') {
        this.setBooleanClass(this.focusable, 'm-focusable');
      }
    }
  }
  return FocusableMixin;
}
