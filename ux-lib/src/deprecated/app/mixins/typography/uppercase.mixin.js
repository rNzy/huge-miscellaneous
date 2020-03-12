export default function UppercaseMixin(base) {
  class UppercaseMixin extends base {
    static get properties() {
      return {
        uppercase: {
          type: 'boolean'
        }
      };
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (super.attributeChangedCallback)
        super.attributeChangedCallback(name, oldValue, newValue);
      if (oldValue === newValue) return;
      if (!this.container) return;
      if (name === 'uppercase') {
        if (this.uppercase) this.container.style.textTransform = 'uppercase';
        else this.container.style.textTransform = '';
      }
    }
  }
  return UppercaseMixin;
}
